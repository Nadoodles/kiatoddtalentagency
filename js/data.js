var DIVISIONS = [
  { id: "theatrical", label: "Theatrical", tagline: "Film & Television" },
  { id: "commercial", label: "Commercial", tagline: "Commercial & Advertising" },
  { id: "host", label: "Host", tagline: "Hosting & Presenting" },
  { id: "voiceover", label: "Voice Over", tagline: "Voice & Character" },
  { id: "kids", label: "Kids", tagline: "Youth Talent" }
];

function divisionLabel(id) {
  var d = DIVISIONS.filter(function (x) { return x.id === id; })[0];
  return d ? d.label : id;
}

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
    credits: ["The Wonder Years", "Little Giants", "Independence Day"],
    imdb: "https://www.imdb.com/name/nm0491885/"
  },
  {
    name: "Brian Hooks",
    slug: "brian-hooks",
    division: "theatrical",
    gender: "men",
    role: "Actor",
    image: "assets/talentTheatrical/brianHooks.avif",
    bio: null,
    credits: ["Menace II Society", "The Wood", "Blue Streak"],
    imdb: "https://www.imdb.com/find/?q=Brian%20Hooks"
  },
  {
    name: "Jazsmin Lewis",
    slug: "jazsmin-lewis",
    division: "theatrical",
    gender: "women",
    role: "Actor",
    image: "assets/talentTheatrical/jazsminLewis.avif",
    bio: null,
    credits: ["Ali", "The Best Man", "Men of Honor"],
    imdb: "https://www.imdb.com/find/?q=Jazsmin%20Lewis"
  },
  { name: "Diane Robin", slug: "diane-robin", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/dianeRobin.avif", bio: null, credits: null, imdb: null },
  { name: "Michael Colyar", slug: "michael-colyar", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/michaelColyar.avif", bio: null, credits: null, imdb: null },
  { name: "Starletta DuPois", slug: "starletta-dupois", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/starlettaDuPois.avif", bio: null, credits: null, imdb: null },
  { name: "Vic Brewski", slug: "vic-brewski", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/vicBrewski.avif", bio: null, credits: null, imdb: null },
  { name: "Alice Prime", slug: "alice-prime", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/alicePrime.avif", bio: null, credits: null, imdb: null },
  { name: "Corey Mekell", slug: "corey-mekell", division: "commercial", gender: "men", role: "Actor", image: "assets/commercial/coreyMekell.avif", bio: null, credits: null, imdb: null },
  { name: "Keith Dean", slug: "keith-dean", division: "commercial", gender: "men", role: "Actor", image: "assets/commercial/keithDean.avif", bio: null, credits: null, imdb: null },
  { name: "Lindsay Mushett", slug: "lindsay-mushett", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/lindsayMushett.avif", bio: null, credits: null, imdb: null },
  { name: "Olivia D. Robinson", slug: "olivia-d-robinson", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/oliviaDRobinson.avif", bio: null, credits: null, imdb: null },
  { name: "Rhys Hyatt", slug: "rhys-hyatt", division: "commercial", gender: "men", role: "Actor", image: "assets/commercial/rhysHyatt.avif", bio: null, credits: null, imdb: null },
  { name: "Shani Shockley", slug: "shani-shockley", division: "commercial", gender: "women", role: "Actor", image: "assets/commercial/shaniShockley.avif", bio: null, credits: null, imdb: null }
];
