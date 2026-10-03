import { photo } from "./images";

export const SAMPLE =
  "This is just sample text. This is just used to fill this page so it looks like there are words.";

/* ---------- hero moodboard ----------
   x, y   top-left corner of the card, as a % of the screen
   w      width in "u" units (about 1vw on desktop)
   ratio  height divided by width
   r      tilt in degrees
   z      how far the card drifts away as the hero fades out
   tape   colour of the strip holding it down ("dark", "mid" or "light")
   lead   the ONE card that travels to the right and merges into the story
          photo. Put `lead: true` on any card (only one) to choose it.     */
const raw = [
  { x: 3, y: 15, w: 14, ratio: 1.3, r: -8, z: 1.4, tape: "dark" },
  { x: 19, y: 11, w: 11, ratio: 1.0, r: 5, z: 2.2, tape: "mid" },
  { x: 35, y: 9, w: 14, ratio: 0.75, r: -3, z: 1.0, tape: "light" },
  { x: 54, y: 10, w: 10, ratio: 1.3, r: 7, z: 2.0, tape: "dark" },
  { x: 67, y: 13, w: 15, ratio: 1.1, r: -5, z: 1.2, tape: "mid" },
  { x: 85, y: 16, w: 12, ratio: 1.35, r: 8, z: 1.8, tape: "dark" },
  { x: 2, y: 45, w: 14, ratio: 1.0, r: 6, z: 2.4, tape: "mid", lead: true },
  { x: 86, y: 52, w: 11, ratio: 1.2, r: -7, z: 2.2, tape: "light" },
  { x: 11, y: 69, w: 14, ratio: 1.2, r: -4, z: 1.3, tape: "dark" },
  { x: 29, y: 72, w: 12, ratio: 0.8, r: 4, z: 2.0, tape: "mid" },
  { x: 45, y: 73, w: 15, ratio: 0.75, r: -2, z: 1.1, tape: "light" },
  { x: 62, y: 70, w: 11, ratio: 1.3, r: 6, z: 2.3, tape: "dark" },
  { x: 75, y: 68, w: 13, ratio: 1.1, r: -6, z: 1.5, tape: "mid" },
];

/* ---------- hero board on phones ----------
   A calmer layout: four photos, two above the headline and two below, so the
   middle of the screen is left free for the words. Keyed by the card's index
   in the list above. Cards that aren't listed here are hidden on phones.
   x, y   top-left corner as a % of the screen
   w      width in vw (1 = 1% of the screen width)
   ratio, r, z  same meaning as above                                         */
const mobileLayout = {
  0: { x: 5, y: 11, w: 36, ratio: 1.25, r: -6, z: 1.4 },
  2: { x: 52, y: 9, w: 40, ratio: 1.0, r: 5, z: 2.0 },
  6: { x: 7, y: 65, w: 38, ratio: 1.0, r: 6, z: 2.4 }, // the lead card
  9: { x: 54, y: 68, w: 36, ratio: 1.2, r: -5, z: 1.8 },
};

const heroPhotos = [
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978049/3_ifwopd.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978049/4_tcyqoa.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978050/2_fqbwrx.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978050/5_kukhk4.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978049/1_lhs7vh.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978050/9_tnanzs.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978050/8_usob8y.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978050/6_fyeatb.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978051/7_norfhz.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978051/10_msolsn.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978674/12_kmmn3b.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978674/13_ynnnsj.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978674/11_wmmpw7.jpg",
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978675/14_ijwgoj.jpg"
]

export const board = raw.map((c, n) => ({
  ...c,
  n,
  // which way the card drifts when the page zooms through it
  ox: +(c.x + c.w / 2 - 50).toFixed(1),
  oy: +(c.y + 6 - 50).toFixed(1),
  src: heroPhotos[n % heroPhotos.length],
  m: mobileLayout[n] && {
    ...mobileLayout[n],
    ox: +(mobileLayout[n].x + mobileLayout[n].w / 2 - 50).toFixed(1),
    oy: +(mobileLayout[n].y + 6 - 50).toFixed(1),
  },
}));

/* ---------- story section ----------
   Each step swaps the text and the photo, and moves the status bars on.  */
// The first story photo IS the lead card's photo, so the merge lines up exactly.
const leadCard = board.find((c) => c.lead);

export const gridPhotos = [board[1].src, board[4].src, board[8].src, board[11].src];

export const steps = [
  {
    title: "Secure your creative work",
    text: "Upload your finished piece and lock it. Your client sees everything and can take nothing until you say so.",
    src: leadCard.src,
  },
  {
    title: "Work with clients but have full control",
    text: "Clients review the full-quality file on a view-only page. No download, no screenshots, no surprises.",
    src: board[7].src,
  },
  {
    title: "Share drafts without losing credit",
    text: "Send one link. Every draft carries your name, so your work never travels unsigned.",
    src: board[3].src,
  },
  {
    title: "Launch your brand with confidence",
    text: "When the balance clears, press Approve. The lock opens, the client downloads, and the piece joins your portfolio.",
    src: board[9].src,
  },
];

/* ---------- third section (placeholder, we'll style it later) ---------- */
export const outro = {
  title: "Your brand, in your hands",
  text: SAMPLE,
  src: photo("bf-outro", 900, 1100),
};

/* ---------- who it's for: portrait photos, copy, and one protection detail each ---------- */
export const audience = [
  {
    title: "Graphic designers",
    who: "Freelance and solo gigs",
    text: "You send the final file and the payment goes quiet. Keep your work locked until you decide it's theirs.",
    src: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790983131/graphic_designer_xmlt7b.jpg",
    tilt: -2,
  },
  {
    title: "Photographers",
    who: "Your own shoots and gigs",
    text: "One full-resolution gallery in a client's hands and you're no longer needed. Let them review everything, and keep the files until you release them.",
    src: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790983131/photo_txqkzj.jpg",
    tilt: 2,
  },
  {
    title: "Agencies",
    who: "Many clients, many companies",
    text: "One leaked draft can cost you a client. Control who sees what, per client and per project, and release work only when it's signed off.",
    src: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790983196/agency_tomt8s.jpg",
    tilt: -1,
  },
];

/* ---------- pricing (video links are demos, swap later) ---------- */
export const pricingHeading = "Start free. Protect more as you grow.";
export const plans = [
  {
    name: "Free",
    price: "₦0",
    note: "To try it out",
    rows: [["Projects", "3"], ["Uploads", "10 total"], ["Portfolio", "No portfolio", true], ["Protection", "Watermark only"]],
    cta: "Get started free",
    video: "aqz-KE-bpKQ",
  },
  {
    name: "Pro",
    price: "₦999",
    per: "/month",
    note: "For working creatives",
    tag: "Start here",
    rows: [["Projects", "20"], ["Uploads", "200 total"], ["Portfolio", "Included"], ["Protection", "Custom watermark and quality controls"]],
    cta: "Subscribe now",
    video: "aqz-KE-bpKQ",
  },
  {
    name: "Max",
    price: "₦1,900",
    per: "/month",
    note: "For a full practice",
    rows: [["Projects", "50"], ["Uploads", "500 total"], ["Portfolio", "Custom portfolio builder"], ["Protection", "Everything in Pro"]],
    cta: "Subscribe now",
    video: "aqz-KE-bpKQ",
  },
  {
    name: "Enterprise",
    price: "Let's talk",
    note: "For teams and agencies",
    rows: [["Projects", "Custom"], ["Uploads", "Custom"], ["Portfolio", "Custom systems"], ["Protection", "Built around you"]],
    cta: "Contact us",
    video: "aqz-KE-bpKQ",
  },
];

/* ---------- philosophy video (demo link, swap later) + footer ---------- */
export const philosophy = {
  heading: "Your creativity is worth protecting.",
  video: "aqz-KE-bpKQ",
  poster: board[5].src,
};
export const contactEmails = ["eneikareawajimathias@gmail.com", "finiakene@gmail.com"];