var PROMPT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
  '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/>' +
  '<path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>';

var FLIP_ICON = PROMPT_ICON;

var ARROW_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
  '<path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

// credits entries may be a plain string or a { title, category } object.
function creditTitle(c) {
  return typeof c === "string" ? c : c.title;
}

// A person's outbound links, in display order. epk (a full profile page) comes first.
function personLinks(person) {
  var links = [];
  if (person.epk) links.push({ label: "View Profile", href: person.epk });
  if (person.imdb) links.push({ label: "IMDb", href: person.imdb });
  if (person.actorAccess) links.push({ label: "Actors Access", href: person.actorAccess });
  return links;
}

// How a card behaves depends on what we actually have for that person, so no card
// ever flips to an empty "coming soon" back:
//   flip   - has credits or a bio, or 2+ links to show on the back
//   link   - only one link: the whole card goes straight there
//   static - nothing yet: just the headshot, name and division
function cardMode(person) {
  var hasContent = (person.credits && person.credits.length) || person.bio;
  var links = personLinks(person);
  if (hasContent || links.length > 1) return "flip";
  if (links.length === 1) return "link";
  return "static";
}

function frontFace(person, mode) {
  var link = personLinks(person)[0];
  var chrome = "";
  if (mode === "flip") {
    chrome =
      '<div class="flip-badge">' + FLIP_ICON + "</div>" +
      '<div class="prompt">' + PROMPT_ICON + "Click to explore</div>";
  } else if (mode === "link") {
    chrome =
      '<div class="flip-badge">' + ARROW_ICON + "</div>" +
      '<div class="prompt">' + ARROW_ICON + escapeHtml(link.label === "View Profile" ? "View Profile" : "View " + link.label) + "</div>";
  }
  return (
    '<div class="face face-front">' +
      '<div class="photo">' +
        '<img src="' + person.image + '" alt="' + escapeHtml(person.name) + ' headshot" loading="eager" />' +
        '<div class="scrim"></div>' +
        '<div class="id">' +
          '<span class="name">' + escapeHtml(person.name) + "</span>" +
          '<span class="division">' + escapeHtml(divisionLabel(person.division)) + "</span>" +
        "</div>" +
        chrome +
      "</div>" +
    "</div>"
  );
}

function backFace(person) {
  var body = "";
  if (person.credits && person.credits.length) {
    var items = person.credits
      .map(function (c) { return "<li>" + escapeHtml(creditTitle(c)) + "</li>"; })
      .join("");
    body = '<p class="label">Selected Work</p><ul class="credits">' + items + "</ul>";
  } else if (person.bio) {
    body = '<p class="label">About</p><p class="bio">' + escapeHtml(person.bio) + "</p>";
  }
  var links = '<div class="back-links">' +
    personLinks(person).map(function (l) {
      return '<a class="imdb" href="' + l.href + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">' +
        escapeHtml(l.label) + " " + ARROW_ICON + "</a>";
    }).join("") +
  "</div>";
  return (
    '<div class="face face-back">' +
      '<p class="name">' + escapeHtml(person.name) + "</p>" +
      '<p class="role">' + escapeHtml(person.role) + " / " + escapeHtml(divisionLabel(person.division)) + "</p>" +
      body +
      links +
    "</div>"
  );
}

function cardMarkup(person) {
  var mode = cardMode(person);
  var name = escapeHtml(person.name) + ", " + escapeHtml(person.role);
  var inner;
  if (mode === "flip") {
    inner =
      '<button class="flip" type="button" aria-pressed="false" aria-label="' + name + '. Activate to see more about this talent.">' +
        frontFace(person, mode) + backFace(person) +
      "</button>";
  } else if (mode === "link") {
    var link = personLinks(person)[0];
    inner =
      '<a class="flip is-link" href="' + link.href + '" target="_blank" rel="noopener noreferrer" aria-label="' +
        name + ". " + escapeHtml(link.label) + ' (opens in a new tab)">' +
        frontFace(person, mode) +
      "</a>";
  } else {
    inner = '<div class="flip is-static">' + frontFace(person, mode) + "</div>";
  }
  return (
    '<div class="card" data-mode="' + mode + '" data-name="' + escapeHtml(person.name) + '">' +
      '<div class="card-inner">' + inner + "</div>" +
    "</div>"
  );
}

function bindCardFlips(container) {
  container.querySelectorAll(".card").forEach(function (card) {
    var btn = card.querySelector("button.flip");
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
      var flipped = card.classList.toggle("is-flipped");
      btn.setAttribute("aria-pressed", flipped ? "true" : "false");
    });
  });
}
