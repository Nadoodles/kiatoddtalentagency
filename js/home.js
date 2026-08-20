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
  rail.innerHTML = people.map(cardMarkup).join("");
  bindCardFlips(rail);
  updateRailEdges();
}

function setActiveDivision(divisionId) {
  document.querySelectorAll("#divisions .tab").forEach(function (tab) {
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

document.addEventListener("DOMContentLoaded", function () {
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
});
