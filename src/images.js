// Logos. The first works on light backgrounds, the second on dark ones.
// The navbar swaps between them as the page behind it changes.
export const logoOnLight =
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1791640738/LOGO_Light_hloyxe.svg";
export const logoOnDark =
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1791640733/LOGO_Dark_nnfgu3.svg";

// Sample photos. picsum.photos always loads, so the layout is easy to judge.
// Swap `photo()` for your own files or Unsplash URLs whenever you're ready:
//   const photo = (name) => `/images/${name}.jpg`;
export const photo = (seed, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Full-screen menu: label, link target, and the preview shown on hover.
// "#how" only works on the home page; on /wall and /stats it has to point back to "/#how".
export const toHome = (href) => (href.startsWith("#") && window.location.pathname !== "/" ? `/${href}` : href);

export const menuLinks = [
  { label: "Who it's for", href: "#audience", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978049/1_lhs7vh.jpg" },
  { label: "How it works", href: "#how", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978674/13_ynnnsj.jpg" },
  { label: "Philosophy", href: "#philosophy", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790983196/agency_tomt8s.jpg" },
  { label: "The Wall", href: "/wall/shame", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978049/1_lhs7vh.jpg" },
  { label: "Live stats", href: "/stats", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978674/13_ynnnsj.jpg" },
];