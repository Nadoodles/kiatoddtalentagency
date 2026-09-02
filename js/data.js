var DIVISIONS = [
  { id: "theatrical", label: "Theatrical", tagline: "Film & Television" }
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
  // --- Women, in priority order ---
  { name: "Starletta DuPois", slug: "starletta-dupois", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/starlettaDuPois.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0210915/", actorAccess: null, epk: null },
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
  { name: "Brely Evans", slug: "brely-evans", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/brelyEvans.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3858768/", actorAccess: null, epk: null },
  { name: "Diane Robin", slug: "diane-robin", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/dianeRobin.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0732187/", actorAccess: null, epk: null },
  { name: "Mo Ashley", slug: "mo-ashley", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/moAshley.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm14508199/", actorAccess: null, epk: null },
  { name: "Amalla Grace", slug: "amalla-grace", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/AmallaGrace.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm15106935/", actorAccess: null, epk: null },
  { name: "Nicole Peplinski", slug: "nicole-peplinski", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/nicolePeplinski.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2624734/", actorAccess: null, epk: null },
  { name: "Alice Prime", slug: "alice-prime", division: "theatrical", gender: "women", role: "Actor", image: "assets/commercial/alicePrime.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm5292811/", actorAccess: null, epk: null },
  { name: "Shani Shockley", slug: "shani-shockley", division: "theatrical", gender: "women", role: "Actor", image: "assets/commercial/shaniShockley.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2998826/", actorAccess: null, epk: null },
  { name: "Olivia D. Robinson", slug: "olivia-d-robinson", division: "theatrical", gender: "women", role: "Actor", image: "assets/commercial/oliviaDRobinson.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2307513/", actorAccess: null, epk: null },
  { name: "Lindsay Mushett", slug: "lindsay-mushett", division: "theatrical", gender: "women", role: "Actor", image: "assets/commercial/lindsayMushett.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm7512906/", actorAccess: null, epk: null },
  { name: "Maria Caruso", slug: "maria-caruso", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/mariaCaruso.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm14340472/", actorAccess: null, epk: null },
  { name: "Angelique Wyche", slug: "angelique-wyche", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/angeliqueWyche.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm13265141/", actorAccess: null, epk: null },
  { name: "Rebecca Ritz", slug: "rebecca-ritz", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/rebeccaRitz.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm1179821/", actorAccess: null, epk: null },
  { name: "Jessica Jarrell", slug: "jessica-jarrell", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/jessicaJarrell.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0418945/", actorAccess: null, epk: null },
  { name: "Cailin Peluso", slug: "cailin-peluso", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/cailinPeluso.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm14373331/", actorAccess: null, epk: null },
  { name: "Lena Anthony", slug: "lena-anthony", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/lenaAnthony.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm4315368/", actorAccess: null, epk: null },
  { name: "Julie M Amuedo", slug: "julie-m-amuedo", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/julieAmuedo.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm12003472/", actorAccess: null, epk: null },
  { name: "Taprena Michelle Augustine", slug: "taprena-michelle-augustine", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/taprenaMichelle.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2949133/", actorAccess: null, epk: null },
  { name: "Sadie Brook", slug: "sadie-brook", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/sadieBrook.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2034046/", actorAccess: null, epk: null },
  { name: "Avise Parsons", slug: "avise-parsons", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/aviseParsons.avif", bio: null, credits: null, imdb: "https://pro.imdb.com/name/nm2613120/", actorAccess: null, epk: null },
  { name: "Monica Joelle", slug: "monica-joelle", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/monicaJoelle.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm7269896/", actorAccess: null, epk: null },
  { name: "Karla Sonnier", slug: "karla-sonnier", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/karlaSonnier.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm11185630/", actorAccess: null, epk: null },
  { name: "Zari Alisha Rose", slug: "zari-alisha-rose", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/zariAlishaRose.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3734012/", actorAccess: null, epk: null },
  { name: "Amajae Hardy-Jones", slug: "amajae-hardy-jones", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/amajaeHardyJones.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10636986/", actorAccess: null, epk: null },
  { name: "Devanny Pinn", slug: "devanny-pinn", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/devannyPinn.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm1922788/", actorAccess: null, epk: null },
  { name: "Jutta Charbonnier", slug: "jutta-charbonnier", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/juttaCharbonnier.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm16016118/", actorAccess: null, epk: null },
  { name: "Christina Marie Leonard", slug: "christina-marie-leonard", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/christinaMarieLeonard.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2825203/", actorAccess: null, epk: null },
  { name: "Ramona Rideout", slug: "ramona-rideout", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/ramonaRideout.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm9736140/", actorAccess: null, epk: null },
  { name: "Eleane Puell", slug: "eleane-puell", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/eleanePuell.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm5904862/", actorAccess: null, epk: null },
  { name: "Chelsea Janelle", slug: "chelsea-janelle", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/chelseaJanelle.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2465989/", actorAccess: null, epk: null },
  { name: "Brianna Baulete", slug: "brianna-baulete", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/BriannaBaulete.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm14077130/", actorAccess: null, epk: null },
  { name: "Crystal De La Cruz", slug: "crystal-de-la-cruz", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/crystalDeLaCruz.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm8120432/", actorAccess: null, epk: null },
  { name: "Megan Frances", slug: "megan-frances", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/meganFrances.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0442061/", actorAccess: null, epk: null },
  { name: "Allison Keogh", slug: "allison-keogh", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/allisonKeogh.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm4425901/", actorAccess: null, epk: null },
  { name: "Kiarra Harris", slug: "kiarra-harris", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/kiarraHarris.avif", bio: null, credits: null, imdb: "https://pro.imdb.com/name/nm9100449/", actorAccess: null, epk: null },
  { name: "Brianni Walker", slug: "brianni-walker", division: "theatrical", gender: "women", role: "Actor", image: "assets/talentTheatrical/brianniWalker.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm5405385/", actorAccess: null, epk: null },

  // --- Men, in priority order ---
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
  { name: "Cornell Young", slug: "cornell-young", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/cornellYoung.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm15998059/", actorAccess: null, epk: null },
  { name: "Miguel A Nunez Jr", slug: "miguel-a-nunez-jr", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/miguelNunezJr.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0639200/", actorAccess: null, epk: null },
  { name: "Jay Phillips", slug: "jay-phillips", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/jayPhillips.png", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm1521239/", actorAccess: null, epk: null },
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
  { name: "Corey Mekell", slug: "corey-mekell", division: "theatrical", gender: "men", role: "Actor", image: "assets/commercial/coreyMekell.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: "https://express.adobe.com/page/1JQ0SOIHfIdQZ/" },
  { name: "Rhys Hyatt", slug: "rhys-hyatt", division: "theatrical", gender: "men", role: "Actor", image: "assets/commercial/rhysHyatt.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm9277608/", actorAccess: null, epk: null },
  { name: "Troy Anthony Brookins", slug: "troy-anthony-brookins", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/troyBrookins.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10170027/", actorAccess: null, epk: null },
  { name: "Michael Colyar", slug: "michael-colyar", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/michaelColyar.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0173485/", actorAccess: null, epk: null },
  { name: "Vic Brewski", slug: "vic-brewski", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/vicBrewski.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm13446695/", actorAccess: null, epk: null },
  { name: "Giovanni Watson", slug: "giovanni-watson", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/giovanniWatson.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3488385/", actorAccess: null, epk: null },
  { name: "Jay Montalvo", slug: "jay-montalvo", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/jayMontalvo.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0598887/", actorAccess: null, epk: null },
  { name: "Jonathan Turner Smith", slug: "jonathan-turner-smith", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/jonathanTurnerSmith.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm4859016/", actorAccess: null, epk: null },
  { name: "Nic Few", slug: "nic-few", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/nicFew.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3216737/", actorAccess: null, epk: null },
  { name: "Barry Rowser", slug: "barry-rowser", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/barryRowser.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm13901359/", actorAccess: null, epk: null },
  { name: "Vaz Andreas", slug: "vaz-andreas", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/vazAndreas.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Frank Fiola", slug: "frank-fiola", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/frankFiola.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm8264230/", actorAccess: null, epk: null },
  { name: "Archer McKnight", slug: "archer-mcknight", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/archerMcKnight.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm9067962/", actorAccess: null, epk: null },
  { name: "Germaine Carpenter", slug: "germaine-carpenter", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/germaineCarpenter.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm11917165/", actorAccess: null, epk: null },
  { name: "Austin Kase", slug: "austin-kase", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/austinKase.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Darrien Burks", slug: "darrien-burks", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/darrienBurks.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10492987/", actorAccess: null, epk: null },
  { name: "Mike Ciriaco", slug: "mike-ciriaco", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/mikeCiriaco.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm2064206/", actorAccess: null, epk: null },
  { name: "Randal Dennis Jr", slug: "randal-dennis-jr", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/randalDennisJr.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm16369336/", actorAccess: null, epk: null },
  { name: "Elijah Rashad", slug: "elijah-rashad", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/elijahRashad.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm12318997/", actorAccess: null, epk: null },
  { name: "Rufino Romero", slug: "rufino-romero", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/rufinoRomero.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm6573009/", actorAccess: null, epk: null },
  { name: "Michael Patrick Calas", slug: "michael-patrick-calas", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/michaelPatricCalas.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm1826146/", actorAccess: null, epk: null },
  { name: "Joe Goode", slug: "joe-goode", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/joeGoodeVII.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm9018967/", actorAccess: null, epk: null },
  { name: "Anthony Elfonzia", slug: "anthony-elfonzia", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/anthonyElfonzia.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3014667/", actorAccess: null, epk: null },
  { name: "Rodney Chaise Williams", slug: "rodney-chaise-williams", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/RodneyChaiseWilliams.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3074477/", actorAccess: null, epk: null },
  { name: "Courtney Theophin", slug: "courtney-theophin", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/courtneyTheophin.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10827017/", actorAccess: null, epk: null },
  { name: "Malik Barnhardt", slug: "malik-barnhardt", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/malikBarnhardt.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm1271219/", actorAccess: null, epk: null },
  { name: "Noah Jay Wood", slug: "noah-jay-wood", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/noahJaywood.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm12120603/", actorAccess: null, epk: null },
  { name: "Jeris DuPree", slug: "jeris-dupree", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/jerisDuPree.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10301375/", actorAccess: null, epk: null },
  { name: "Jaxon Hibler", slug: "jaxon-hibler", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/jaxonHibler.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm6754647/", actorAccess: null, epk: null },
  { name: "Rob Johnston", slug: "rob-johnston", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/robJohnston.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0426817/", actorAccess: null, epk: null },
  { name: "Ryan Wayne", slug: "ryan-wayne", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/ryanWayne.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10233644/", actorAccess: null, epk: null },
  { name: "Oscar Jordan", slug: "oscar-jordan", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/oscarJordan.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm0430122/", actorAccess: null, epk: null },
  { name: "Jayse Obrien", slug: "jayse-obrien", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/JayseObrien.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Doral Miller", slug: "doral-miller", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/doralMiller.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm10978561/", actorAccess: null, epk: null },
  { name: "Da'Jon A. Porter", slug: "dajon-a-porter", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/da'jonAPorter.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm11617268/", actorAccess: null, epk: null },
  { name: "Chris Wang", slug: "chris-wang", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/chrisWang.avif", bio: null, credits: null, imdb: null, actorAccess: null, epk: null },
  { name: "Tyler McKenna", slug: "tyler-mckenna", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/tylerMcKenna.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm4669753/", actorAccess: null, epk: null },
  { name: "Wendell Kinney", slug: "wendell-kinney", division: "theatrical", gender: "men", role: "Actor", image: "assets/talentTheatrical/wendellKinney.avif", bio: null, credits: null, imdb: "https://www.imdb.com/name/nm3800780/", actorAccess: null, epk: null },

];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { DIVISIONS: DIVISIONS, TALENT: TALENT };
}
