var DIVISIONS = [
  { id: "theatrical", label: "Theatrical" },
  { id: "commercial", label: "Commercial" },
  { id: "host", label: "Host" },
  { id: "voiceover", label: "Voice Over" },
  { id: "kids", label: "Kids" }
];

// credits/imdb: null until confirmed — cards render a "coming soon" state instead of guessing.
var TALENT = [
  {
    name: "Dan Lauria",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/danLauria.avif",
    credits: ["The Wonder Years", "Little Giants", "Independence Day"],
    imdb: "https://www.imdb.com/name/nm0491885/"
  },
  {
    name: "Brian Hooks",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/brianHooks.avif",
    credits: ["Menace II Society", "The Wood", "Blue Streak"],
    imdb: "https://www.imdb.com/find/?q=Brian%20Hooks"
  },
  {
    name: "Jazsmin Lewis",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/jazsminLewis.avif",
    credits: ["Ali", "The Best Man", "Men of Honor"],
    imdb: "https://www.imdb.com/find/?q=Jazsmin%20Lewis"
  },
  {
    name: "Diane Robin",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/dianeRobin.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Michael Colyar",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/michaelColyar.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Starletta DuPois",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/starlettaDuPois.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Vic Brewski",
    division: "theatrical",
    role: "Actor",
    image: "assets/talentTheatrical/vicBrewski.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Alice Prime",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/alicePrime.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Corey Mekell",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/coreyMekell.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Keith Dean",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/keithDean.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Lindsay Mushett",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/lindsayMushett.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Olivia D. Robinson",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/oliviaDRobinson.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Rhys Hyatt",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/rhysHyatt.avif",
    credits: null,
    imdb: null
  },
  {
    name: "Shani Shockley",
    division: "commercial",
    role: "Actor",
    image: "assets/commercial/shaniShockley.avif",
    credits: null,
    imdb: null
  }
];

var PROMPT_ICON =
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

function cardBackContent(person) {
  if (person.credits && person.credits.length) {
    var items = person.credits
      .map(function (c) { return "<li>" + escapeHtml(c) + "</li>"; })
      .join("");
    var link = person.imdb
      ? '<a class="imdb" href="' + person.imdb + '" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">View IMDb ' + ARROW_ICON + "</a>"
      : "";
    return (
      '<p class="label">Selected Credits</p>' +
      '<ul class="credits">' + items + "</ul>" +
      '<hr class="divider" />' +
      link
    );
  }
  return (
    '<p class="label">Selected Credits</p>' +
    '<p class="pending">Selected credits coming soon.</p>'
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
  var empty = document.getElementById("empty");
  var people = TALENT.filter(function (p) { return p.division === divisionId; });

  if (!people.length) {
    rail.innerHTML = "";
    rail.hidden = true;
    empty.hidden = false;
    return;
  }

  rail.hidden = false;
  empty.hidden = true;

  rail.innerHTML = people.map(function (person) {
    return (
      '<div class="card" data-name="' + escapeHtml(person.name) + '">' +
        '<div class="card-inner">' +
          '<button class="flip" aria-pressed="false" aria-label="' + escapeHtml(person.name) + ", " + escapeHtml(person.role) + '. Activate to view selected credits.">' +
            '<div class="face face-front">' +
              '<div class="photo">' +
                '<img src="' + person.image + '" alt="' + escapeHtml(person.name) + ' headshot" loading="eager" />' +
                '<div class="prompt">' + PROMPT_ICON + "Click to explore</div>" +
              "</div>" +
              '<div class="id">' +
                '<span class="name">' + escapeHtml(person.name) + "</span>" +
                '<span class="division">' + escapeHtml(person.role) + "</span>" +
              "</div>" +
            "</div>" +
            '<div class="face face-back">' +
              '<p class="name">' + escapeHtml(person.name) + "</p>" +
              '<p class="role">' + escapeHtml(person.role) + "</p>" +
              cardBackContent(person) +
            "</div>" +
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
}

function setActiveDivision(divisionId) {
  document.querySelectorAll(".tab").forEach(function (tab) {
    var active = tab.getAttribute("data-division") === divisionId;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-pressed", active ? "true" : "false");
  });
  renderCards(divisionId);
}

renderTabs();
document.getElementById("divisions").addEventListener("click", function (e) {
  var tab = e.target.closest(".tab");
  if (!tab) return;
  setActiveDivision(tab.getAttribute("data-division"));
});
setActiveDivision(DIVISIONS[0].id);
