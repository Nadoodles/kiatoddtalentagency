var NAV_LINKS = [
  { label: "Talent", href: "talent.html" },
  { label: "About", href: "about.html" },
  { label: "Submissions", href: "submissions.html" },
  { label: "Contact", href: "contact.html" }
];

var SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/kia.toddtalentagency", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100088400702302", icon: "facebook" }
];

var SOCIAL_ICONS = {
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>' +
    '<circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">' +
    '<path d="M15 8h2V5h-2c-2 0-3.5 1.5-3.5 3.5V11H9v3h2.5v6h3v-6H17l.5-3h-3V8.7c0-.4.3-.7.5-.7z"/></svg>'
};

function renderSiteNav() {
  var mount = document.getElementById("siteNav");
  if (!mount) return;

  var root = typeof SITE_ROOT !== "undefined" ? SITE_ROOT : "";
  var currentPage = (location.pathname.split("/").pop() || "index.html");

  var links = NAV_LINKS.map(function (link) {
    var active = currentPage === link.href;
    return (
      '<a class="nav-link' + (active ? " is-current" : "") + '" href="' + root + link.href + '"' +
      (active ? ' aria-current="page"' : "") + ">" + escapeHtml(link.label) + "</a>"
    );
  }).join("");

  var social = SOCIAL_LINKS.map(function (s) {
    return (
      '<a class="nav-social" href="' + s.href + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(s.label) + '">' +
      (SOCIAL_ICONS[s.icon] || "") +
      "</a>"
    );
  }).join("");

  mount.innerHTML =
    '<div class="nav-inner">' +
      '<a class="nav-brand" href="' + root + 'index.html">Kia Todd Talent</a>' +
      '<button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navMenu" aria-label="Toggle menu">' +
        '<span></span><span></span>' +
      "</button>" +
      '<div class="nav-menu" id="navMenu">' +
        '<div class="nav-links">' + links + "</div>" +
        '<div class="nav-socials">' + social + "</div>" +
      "</div>" +
    "</div>";

  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function renderSiteFooter() {
  var mount = document.getElementById("siteFooter");
  if (!mount) return;

  var root = typeof SITE_ROOT !== "undefined" ? SITE_ROOT : "";
  var links = NAV_LINKS.map(function (link) {
    return '<a href="' + root + link.href + '">' + escapeHtml(link.label) + "</a>";
  }).join("");

  mount.innerHTML =
    '<span class="foot-brand">Kia Todd Talent</span>' +
    '<div class="foot-links">' + links + "</div>" +
    '<span class="foot-meta">&copy; ' + new Date().getFullYear() + " Kia Todd Talent Agency</span>";
}

document.addEventListener("DOMContentLoaded", function () {
  renderSiteNav();
  renderSiteFooter();
});
