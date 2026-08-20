function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function renderDivisionTabs(activeId) {
  var nav = document.getElementById("talentDivisions");
  var all = [{ id: "all", label: "All" }].concat(DIVISIONS);
  nav.innerHTML = all.map(function (d) {
    var active = d.id === activeId;
    return (
      '<button class="tab' + (active ? " is-active" : "") + '" type="button" ' +
      'data-division="' + d.id + '" aria-pressed="' + (active ? "true" : "false") + '">' +
      escapeHtml(d.label) +
      "</button>"
    );
  }).join("");
}

function renderGenderFilter(genders, activeGender) {
  var wrap = document.getElementById("genderFilter");
  if (genders.length < 2) {
    wrap.hidden = true;
    wrap.innerHTML = "";
    return;
  }
  wrap.hidden = false;
  var options = [{ id: "all", label: "All" }].concat(
    genders.map(function (g) { return { id: g, label: g === "women" ? "Women" : "Men" }; })
  );
  wrap.innerHTML = options.map(function (o) {
    var active = o.id === activeGender;
    return (
      '<button class="subfilter' + (active ? " is-active" : "") + '" type="button" data-gender="' + o.id + '">' +
      escapeHtml(o.label) +
      "</button>"
    );
  }).join("");
}

var state = { division: getParam("division") || "all", gender: "all" };

function applyFilters() {
  var people = TALENT.filter(function (p) {
    return state.division === "all" || p.division === state.division;
  });

  var genders = Array.from(new Set(people.map(function (p) { return p.gender; }).filter(Boolean)));
  if (state.gender !== "all" && genders.indexOf(state.gender) === -1) state.gender = "all";
  renderGenderFilter(genders, state.gender);

  if (state.gender !== "all") {
    people = people.filter(function (p) { return p.gender === state.gender; });
  }

  var grid = document.getElementById("talentGrid");
  var empty = document.getElementById("talentEmpty");

  if (!people.length) {
    grid.innerHTML = "";
    grid.hidden = true;
    empty.hidden = false;
    return;
  }

  grid.hidden = false;
  empty.hidden = true;
  grid.innerHTML = people.map(cardMarkup).join("");
  bindCardFlips(grid);
}

function setDivision(id) {
  state.division = id;
  state.gender = "all";
  renderDivisionTabs(id);
  applyFilters();
  var url = new URL(location.href);
  if (id === "all") url.searchParams.delete("division");
  else url.searchParams.set("division", id);
  history.replaceState(null, "", url);
}

document.addEventListener("DOMContentLoaded", function () {
  renderDivisionTabs(state.division);
  applyFilters();

  document.getElementById("talentDivisions").addEventListener("click", function (e) {
    var tab = e.target.closest(".tab");
    if (!tab) return;
    setDivision(tab.getAttribute("data-division"));
  });

  document.getElementById("genderFilter").addEventListener("click", function (e) {
    var btn = e.target.closest(".subfilter");
    if (!btn) return;
    state.gender = btn.getAttribute("data-gender");
    renderGenderFilter(
      Array.from(new Set(TALENT.filter(function (p) { return state.division === "all" || p.division === state.division; }).map(function (p) { return p.gender; }).filter(Boolean))),
      state.gender
    );
    applyFilters();
  });
});
