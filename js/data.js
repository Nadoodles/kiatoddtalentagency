var DIVISIONS = [
  { id: "theatrical", label: "Theatrical", tagline: "Film & Television" },
  { id: "commercial", label: "Commercial", tagline: "Commercial & Advertising" }
];

function divisionLabel(id) {
  var d = DIVISIONS.filter(function (x) { return x.id === id; })[0];
  return d ? d.label : id;
}

// To add someone to the roster, add an object to TALENT below with these fields:
//   name      required — full name as it should display
//   slug      required — lowercase-hyphenated, unique (not yet used for routing, but keep it unique)
//   division  required — must match one of the `id` values in DIVISIONS above
//   gender    "men" or "women" — only used to power the optional gender sub-filter on a division
//   role      required — short label, e.g. "Actor"
//   image     required — path under assets/, same aspect treatment as the others (portrait, headroom at top)
//   bio       string or null — only shown on the card back if there are no credits
//   credits   array of { title, category } or null — shown as "Selected Work" on the card back
//   imdb          URL or null
//   actorAccess   URL or null — link to the person's Actors Access profile
//   epk           URL or null — once a person has a full profile/EPK page, set this and the card
//                 back will link there ("View Profile") alongside IMDb / Actors Access
//
// credits: null until verified — no bio/credit text is invented. A person with
// no credits and no approved bio still renders and flips, showing a neutral
// "coming soon" state instead of fabricated content.
var TALENT = [
  {
    name: "Dan Lauria",
    slug: "dan-lauria",
    division: "theatrical",
    gender: "men",
    role: "Actor",
    image: "assets/talentTheatrical/danLauria.avif",
    bio: null,
    credits: [
      { title: "The Wonder Years", category: "Television" },
      { title: "Little Giants", category: "Film" },
      { title: "Independence Day", category: "Film" }
    ],
    imdb: "https://www.imdb.com/name/nm0491357/?ref_=nv_sr_srsg_1_tt_0_nm_8_in_0_q_dan%20laurie",
    actorAccess: null,
    epk: null
  },
  {
    name: "Brian Hooks",
    slug: "brian-hooks",
    division: "theatrical",
    gender: "men",
    role: "Actor",
    image: "assets/talentTheatrical/brianHooks.avif",
    bio: null,
    credits: [
      { title: "Menace II Society", category: "Film" },
      { title: "The Wood", category: "Film" },
      { title: "Blue Streak", category: "Film" }
    ],
    imdb: "https://www.imdb.com/name/nm0393655/?ref_=nv_sr_srsg_0_tt_1_nm_7_in_0_q_brian%2520hooks",
    actorAccess: null,
    epk: null
  },
  {
    name: "Jazsmin Lewis",
    slug: "jazsmin-lewis",
    division: "theatrical",
    gender: "women",
    role: "Actor",
    image: "assets/talentTheatrical/jazsminLewis.avif",
    bio: null,
    credits: [
      { title: "Ali", category: "Film" },
      { title: "The Best Man", category: "Film" },
      { title: "Men of Honor", category: "Film" }
    ],
    imdb: "https://www.imdb.com/name/nm0507320/?ref_=fn_t_1",
    actorAccess: null,
    epk: null
  },
  { name: "Diane Robin", slug: "diane-robin", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/dianeRobin.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Michael Colyar", slug: "michael-colyar", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/michaelColyar.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Starletta DuPois", slug: "starletta-dupois", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/starlettaDuPois.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Vic Brewski", slug: "vic-brewski", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/vicBrewski.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Alice Prime", slug: "alice-prime", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/alicePrime.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Corey Mekell", slug: "corey-mekell", division: "commercial", gender: "men", role: "Actor", image: "assets/commercial/coreyMekell.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Keith Dean", slug: "keith-dean", division: "commercial", gender: "men", role: "Actor", image: "assets/commercial/keithDean.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Lindsay Mushett", slug: "lindsay-mushett", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/lindsayMushett.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Olivia D. Robinson", slug: "olivia-d-robinson", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/oliviaDRobinson.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Rhys Hyatt", slug: "rhys-hyatt", division: "commercial", gender: "men", role: "Actor", image: "assets/commercial/rhysHyatt.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Shani Shockley", slug: "shani-shockley", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/shaniShockley.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DIVISIONS: DIVISIONS, TALENT: TALENT };
}
