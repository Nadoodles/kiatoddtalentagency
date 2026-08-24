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

function frontFace(person) {
  return (
    '<div class="face face-front">' +
      '<div class="photo">' +
        '<img src="' + person.image + '" alt="' + escapeHtml(person.name) + ' headshot" loading="eager" />' +
        '<div class="scrim"></div>' +
        '<div class="id">' +
          '<span class="name">' + escapeHtml(person.name) + "</span>" +
          '<span class="division">' + escapeHtml(divisionLabel(person.division)) + "</span>" +
        "</div>" +
        '<div class="flip-badge">' + FLIP_ICON + "</div>" +
        '<div class="prompt">' + PROMPT_ICON + "Click to explore</div>" +
      "</div>" +
    "</div>"
  );
}

function backFace(person) {
  var body;
  if (person.credits && person.credits.length) {
    var items = person.credits
      .map(function (c) { return "<li>" + escapeHtml(creditTitle(c)) + "</li>"; })
      .join("");
    body = '<p class="label">Selected Work</p><ul class="credits">' + items + "</ul>";
  } else if (person.bio) {
    body = '<p class="label">About</p><p class="bio">' + escapeHtml(person.bio) + "</p>";
  } else {
    body = '<p class="label">Selected Work</p><p class="pending">More coming soon.</p>';
  }
  // epk (when a person has a full profile page) takes priority; IMDb and Actors Access
  // are independent external profile links and can both appear alongside it.
  var links = '<div class="back-links">';
  if (person.epk) {
    links += '<a class="imdb" href="' + person.epk + '" onclick="event.stopPropagation()">View Profile ' + ARROW_ICON + "</a>";
  }
  if (person.imdb) {
    links += '<a class="imdb" href="' + person.imdb + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">IMDb ' + ARROW_ICON + "</a>";
  }
  if (person.actorAccess) {
    links += '<a class="imdb" href="' + person.actorAccess + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Actors Access ' + ARROW_ICON + "</a>";
  }
  links += "</div>";
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
  return (
    '<div class="card" data-name="' + escapeHtml(person.name) + '">' +
      '<div class="card-inner">' +
        '<button class="flip" aria-pressed="false" aria-label="' + escapeHtml(person.name) + ", " + escapeHtml(person.role) + '. Activate to view selected work.">' +
          frontFace(person) +
          backFace(person) +
        "</button>" +
      "</div>" +
    "</div>"
  );
}

function bindCardFlips(container) {
  container.querySelectorAll(".card").forEach(function (card) {
    var btn = card.querySelector(".flip");
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
      var flipped = card.classList.toggle("is-flipped");
      btn.setAttribute("aria-pressed", flipped ? "true" : "false");
    });
  });
}
