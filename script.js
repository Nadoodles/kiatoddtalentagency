var DIVISIONS = [
  { id: "theatrical", label: "Theatrical" },
  { id: "commercial", label: "Commercial" },
  { id: "host", label: "Host" },
  { id: "voiceover", label: "Voice Over" },
  { id: "kids", label: "Kids" }
];

function divisionLabel(id) {
  var d = DIVISIONS.filter(function (x) { return x.id === id; })[0];
  return d ? d.label : id;
}

// credits: null until verified — no bio/credit text is invented. A person with
// no credits and no approved bio renders as a headshot-only, non-flipping card.
var TALENT = [
  {
    name: "Dan Lauria",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/danLauria.avif",
    bio: null,
    credits: ["The Wonder Years", "Little Giants", "Independence Day"],
    imdb: "https://www.imdb.com/name/nm0491885/"
  },
  {
    name: "Brian Hooks",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/brianHooks.avif",
    bio: null,
    credits: ["Menace II Society", "The Wood", "Blue Streak"],
    imdb: "https://www.imdb.com/find/?q=Brian%20Hooks"
  },
  {
    name: "Jazsmin Lewis",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/jazsminLewis.avif",
    bio: null,
    credits: ["Ali", "The Best Man", "Men of Honor"],
    imdb: "https://www.imdb.com/find/?q=Jazsmin%20Lewis"
  },
  { name: "Diane Robin", division: "theatrical", role: "Actor", image: "assets/talentTheatrical/dianeRobin.avif", bio: null, credits: null, imdb: null },
  { name: "Michael Colyar", division: "theatrical", role: "Actor", image: "assets/talentTheatrical/michaelColyar.avif", bio: null, credits: null, imdb: null },
  { name: "Starletta DuPois", division: "theatrical", role: "Actor", image: "assets/talentTheatrical/starlettaDuPois.avif", bio: null, credits: null, imdb: null },
  { name: "Vic Brewski", division: "theatrical", role: "Actor", image: "assets/talentTheatrical/vicBrewski.avif", bio: null, credits: null, imdb: null },
  { name: "Alice Prime", division: "commercial", role: "Actor", image: "assets/commercial/alicePrime.avif", bio: null, credits: null, imdb: null },
  { name: "Corey Mekell", division: "commercial", role: "Actor", image: "assets/commercial/coreyMekell.avif", bio: null, credits: null, imdb: null },
  { name: "Keith Dean", division: "commercial", role: "Actor", image: "assets/commercial/keithDean.avif", bio: null, credits: null, imdb: null },
  { name: "Lindsay Mushett", division: "commercial", role: "Actor", image: "assets/commercial/lindsayMushett.avif", bio: null, credits: null, imdb: null },
  { name: "Olivia D. Robinson", division: "commercial", role: "Actor", image: "assets/commercial/oliviaDRobinson.avif", bio: null, credits: null, imdb: null },
  { name: "Rhys Hyatt", division: "commercial", role: "Actor", image: "assets/commercial/rhysHyatt.avif", bio: null, credits: null, imdb: null },
  { name: "Shani Shockley", division: "commercial", role: "Actor", image: "assets/commercial/shaniShockley.avif", bio: null, credits: null, imdb: null }
];

var PROMPT_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
  '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/>' +
  '<path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>';

var FLIP_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
  '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/>' +
  '<path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>';

var ARROW_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
  '<path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
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
      .map(function (c) { return "<li>" + escapeHtml(c) + "</li>"; })
      .join("");
    var link = person.imdb
      ? '<a class="imdb" href="' + person.imdb + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">IMDb ' + ARROW_ICON + "</a>"
      : "";
    body = '<p class="label">Selected Work</p><ul class="credits">' + items + "</ul>" + link;
  } else if (person.bio) {
    body = '<p class="label">About</p><p class="bio">' + escapeHtml(person.bio) + "</p>";
  } else {
    body = '<p class="label">Selected Work</p><p class="pending">Selected work coming soon.</p>';
  }
  return (
    '<div class="face face-back">' +
      '<p class="name">' + escapeHtml(person.name) + "</p>" +
      '<p class="role">' + escapeHtml(person.role) + " / " + escapeHtml(divisionLabel(person.division)) + "</p>" +
      body +
    "</div>"
  );
}

function renderTabs() {
  var nav = document.getElementById("divisions");
  nav.innerHTML = DIVISIONS.map(function (d, i) {
    return (
      '<button class="tab' + (i === 0 ? " is-active" : "") + '" type="button" ' +
      'data-division="' + d.id + '" aria-pressed="' + (i === 0 ? "true" : "false") + '">' +
      escapeHtml(d.label) +
      "</button>"
    );
  }).join("");
}

function renderCards(divisionId) {
  var rail = document.getElementById("rail");
  var railWrap = document.getElementById("railWrap");
  var empty = document.getElementById("empty");
  var people = TALENT.filter(function (p) { return p.division === divisionId; });

  if (!people.length) {
    rail.innerHTML = "";
    railWrap.hidden = true;
    empty.hidden = false;
    return;
  }

  railWrap.hidden = false;
  empty.hidden = true;

  rail.innerHTML = people.map(function (person) {
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
  }).join("");

  rail.querySelectorAll(".card").forEach(function (card) {
    var btn = card.querySelector(".flip");
    btn.addEventListener("click", function () {
      var flipped = card.classList.toggle("is-flipped");
      btn.setAttribute("aria-pressed", flipped ? "true" : "false");
    });
  });

  updateRailEdges();
}

function setActiveDivision(divisionId) {
  document.querySelectorAll(".tab").forEach(function (tab) {
    var active = tab.getAttribute("data-division") === divisionId;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", active ? "true" : "false");
  });
  renderCards(divisionId);
}

function updateRailEdges() {
  var rail = document.getElementById("rail");
  var railWrap = document.getElementById("railWrap");
  var prev = document.getElementById("railPrev");
  var next = document.getElementById("railNext");
  var maxScroll = rail.scrollWidth - rail.clientWidth;
  var atStart = rail.scrollLeft <= 2;
  var atEnd = rail.scrollLeft >= maxScroll - 2;

  railWrap.classList.toggle("at-start", atStart);
  railWrap.classList.toggle("at-end", atEnd || maxScroll <= 0);
  prev.disabled = atStart;
  next.disabled = atEnd || maxScroll <= 0;
}

function scrollRailBy(direction) {
  var rail = document.getElementById("rail");
  var card = rail.querySelector(".card");
  var step = card ? card.getBoundingClientRect().width + 24 : 320;
  rail.scrollBy({ left: direction * step, behavior: "smooth" });
}

renderTabs();
document.getElementById("divisions").addEventListener("click", function (e) {
  var tab = e.target.closest(".tab");
  if (!tab) return;
  setActiveDivision(tab.getAttribute("data-division"));
});
document.getElementById("railPrev").addEventListener("click", function () { scrollRailBy(-1); });
document.getElementById("railNext").addEventListener("click", function () { scrollRailBy(1); });
document.getElementById("rail").addEventListener("scroll", updateRailEdges);
window.addEventListener("resize", updateRailEdges);

setActiveDivision(DIVISIONS[0].id);
