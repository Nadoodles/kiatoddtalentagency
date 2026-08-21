#!/usr/bin/env node
// Generates talent/<slug>/index.html for every person in js/data.js.
// Single source of truth stays js/data.js — this script never hand-authors
// a person's page; it templates one from data. Re-run after editing data.js.

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { TALENT, DIVISIONS } = require(path.join(ROOT, "js", "data.js"));

function divisionLabel(id) {
  const d = DIVISIONS.find((x) => x.id === id);
  return d ? d.label : id;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

const ARROW = "→";

// credits may be plain strings or { title, category } objects. Group by
// category only when every entry actually has one — otherwise render flat,
// since a half-categorized list would imply more certainty than we have.
function renderCredits(person) {
  const credits = person.credits;

  if (!credits || !credits.length) {
    return (
      '<div class="epk-section" id="credits">' +
        "<h2>Selected Work</h2>" +
        '<p class="pending">Selected work coming soon.</p>' +
      "</div>"
    );
  }

  const allCategorized = credits.every((c) => c && typeof c === "object" && c.category);

  if (allCategorized) {
    const groups = {};
    const order = [];
    credits.forEach((c) => {
      if (!groups[c.category]) { groups[c.category] = []; order.push(c.category); }
      groups[c.category].push(c.title);
    });
    const groupsHtml = order.map((cat) => (
      '<div class="epk-credit-group">' +
        `<h3>${escapeHtml(cat)}</h3>` +
        '<ul class="epk-credits">' +
        groups[cat].map((t) => `<li>${escapeHtml(t)}</li>`).join("") +
        "</ul>" +
      "</div>"
    )).join("");
    return `<div class="epk-section" id="credits"><h2>Selected Work</h2>${groupsHtml}</div>`;
  }

  const items = credits.map((c) => `<li>${escapeHtml(typeof c === "string" ? c : c.title)}</li>`).join("");
  return (
    '<div class="epk-section" id="credits">' +
      "<h2>Selected Work</h2>" +
      `<ul class="epk-credits">${items}</ul>` +
    "</div>"
  );
}

function renderBio(person) {
  const text = person.bio || "A full bio for this artist is coming soon.";
  return (
    '<div class="epk-section" id="bio">' +
      "<h2>Bio</h2>" +
      `<p${person.bio ? "" : ' class="pending"'}>${escapeHtml(text)}</p>` +
    "</div>"
  );
}

function renderActions(person) {
  const actions = [];
  if (person.reel) {
    actions.push(`<a class="btn btn-primary" href="${person.reel}" target="_blank" rel="noopener noreferrer">Watch Reel</a>`);
  }
  if (person.imdb) {
    actions.push(`<a class="btn" href="${person.imdb}" target="_blank" rel="noopener noreferrer">View IMDb</a>`);
  }
  if (person.resume) {
    actions.push(`<a class="btn" href="${person.resume}" target="_blank" rel="noopener noreferrer">Download Resume</a>`);
  }
  if (!actions.length) return "";
  return `<div class="epk-actions">${actions.join("")}</div>`;
}

function renderPage(person) {
  const title = `${person.name} | Kia Todd Talent`;
  const description = `${person.name}, ${person.role.toLowerCase()} represented by Kia Todd Talent — ${divisionLabel(person.division)} division, Los Angeles.`;
  const image = `../../${person.image}`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="${escapeHtml(image)}" />
  <meta property="og:type" content="profile" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../style.css" />
</head>
<body>

  <script>var SITE_ROOT = "../../";</script>
  <header class="site-nav" id="siteNav"></header>

  <main class="page">

    <div class="epk-hero-wrap">
      <a class="epk-back" href="../../talent.html?division=${encodeURIComponent(person.division)}">&larr; Back to ${escapeHtml(divisionLabel(person.division))}</a>
      <div class="epk-hero-photo">
        <img src="${image}" alt="${escapeHtml(person.name)} headshot" />
        <div class="epk-scrim"></div>
        <div class="epk-hero-content">
          <h1>${escapeHtml(person.name)}</h1>
          <div class="epk-tags">
            <span class="epk-tag">${escapeHtml(person.role)}</span>
            <span class="epk-tag">${escapeHtml(divisionLabel(person.division))}</span>
          </div>
        </div>
      </div>
    </div>

    <nav class="epk-subnav">
      <a href="#bio">Biography</a>
      <a href="#credits">Selected Work</a>
    </nav>

    <div class="epk-body">
      ${renderBio(person)}
      ${renderCredits(person)}
    </div>

    ${renderActions(person) ? `<div class="epk-body epk-body-actions">${renderActions(person)}</div>` : ""}

    <div class="epk-repped-by">
      <span class="label">Represented By</span>
      <p class="agency-name">Kia Todd Talent Agency</p>
      <a href="../../talent.html">View Full Roster ${ARROW}</a>
    </div>

  </main>

  <footer class="site-footer" id="siteFooter"></footer>

  <script src="../../js/data.js"></script>
  <script src="../../js/cards.js"></script>
  <script src="../../js/nav.js"></script>
</body>
</html>
`;
}

function build() {
  const talentDir = path.join(ROOT, "talent");
  let count = 0;

  TALENT.forEach((person) => {
    if (!person.slug) {
      console.warn(`Skipping "${person.name}" — no slug set.`);
      return;
    }
    const dir = path.join(talentDir, person.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), renderPage(person));
    count += 1;
  });

  console.log(`Generated ${count} talent profile page(s) in /talent/*/index.html`);
}

build();
