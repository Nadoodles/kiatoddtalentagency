// Cloudflare Pages Function — handles POST /api/submit from submissions.html.
//
// Required setup in the Cloudflare Pages project (Settings → Functions):
//   - R2 bucket binding named SUBMISSIONS_BUCKET (any bucket; create one in R2 first)
//   - Environment variable/secret RESEND_API_KEY (from resend.com)
//   - Environment variable NOTIFY_EMAIL (where new-submission emails should land)
//   - Environment variable FROM_EMAIL (a sender address on a domain verified with Resend) 
//
// Local dev: `wrangler pages dev` picks up bindings from wrangler.toml / .dev.vars.

const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15MB per file — matches the "Required Materials" copy on the page
const FILE_FIELDS = ["photo1", "photo2", "photo3", "videoReel", "voReel", "resume"];

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch (err) {
    return json({ error: "Could not read form data." }, 400);
  }

  // Honeypot — real visitors never fill this in; bots that auto-fill every field will.
  if (form.get("company")) {
    return Response.redirect(new URL("/submissions-thanks.html", request.url), 303);
  }

  const name = (form.get("name") || "").toString().trim();
  const email = (form.get("email") || "").toString().trim();
  const phone = (form.get("phone") || "").toString().trim();
  const age = (form.get("age") || "").toString().trim();
  const city = (form.get("city") || "").toString().trim();
  const referral = (form.get("referral") || "").toString().trim();
  const departments = form.getAll("department").map(String);
  const guardianConfirmed = form.get("guardianConfirmed") === "yes";

  if (!name || !email) {
    return json({ error: "Name and email are required." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "That email address doesn't look right." }, 400);
  }
  if (!guardianConfirmed) {
    return json({ error: "Please confirm the age/guardian statement before submitting." }, 400);
  }

  const uploads = [];
  for (const field of FILE_FIELDS) {
    const file = form.get(field);
    if (!(file instanceof File) || file.size === 0) continue;
    if (file.size > MAX_FILE_BYTES) {
      return json({ error: `${field} is larger than the 15MB limit.` }, 400);
    }
    uploads.push({ field, file });
  }

  // Store each upload in R2 under a per-submission prefix, then link to them from the
  // notification email instead of attaching (keeps the email small, handles large reels).
  const submissionId = crypto.randomUUID();
  const storedLinks = [];
  for (const { field, file } of uploads) {
    const key = `submissions/${submissionId}/${field}-${sanitizeFilename(file.name)}`;
    await env.SUBMISSIONS_BUCKET.put(key, file.stream(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
    });
    storedLinks.push({ field, key });
  }

  await sendNotificationEmail(env, { submissionId, name, email, phone, age, city, referral, departments, storedLinks });

  return Response.redirect(new URL("/submissions-thanks.html", request.url), 303);
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
}

async function sendNotificationEmail(env, { submissionId, name, email, phone, age, city, referral, departments, storedLinks }) {
  // These are private R2 object keys, not public URLs — the bucket isn't public, so
  // retrieving a file means pulling it via the R2 dashboard/API, not clicking a link.
  const fileLines = storedLinks.length
    ? storedLinks.map((f) => `  - ${f.field}: ${f.key}`).join("\n")
    : "  (no files uploaded)";

  const text = [
    `New talent submission (${submissionId})`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "(not provided)"}`,
    `Age: ${age || "(not provided)"}`,
    `Current city: ${city || "(not provided)"}`,
    `Referred by: ${referral || "(not provided)"}`,
    `Submitting for: ${departments.join(", ") || "(not specified)"}`,
    ``,
    `Files stored privately in R2 (SUBMISSIONS_BUCKET — retrieve via R2 dashboard/API):`,
    fileLines,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: env.NOTIFY_EMAIL,
      reply_to: email,
      subject: `New submission: ${name}`,
      text,
    }),
  });

  if (!res.ok) {
    // Don't fail the whole request over an email hiccup — the submission is already
    // safely in R2. Log so it shows up in `wrangler pages deployment tail`.
    console.error("Resend notification failed:", res.status, await res.text());
  }
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
