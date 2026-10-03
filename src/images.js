// Logos. The first works on light backgrounds, the second on dark ones.
// The navbar swaps between them as the page behind it changes.
export const logoOnLight =
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790972724/Untitled_design_ngonsf.svg";
export const logoOnDark =
  "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790973852/Untitled_design_3_oyy0uf.png";

// Sample photos. picsum.photos always loads, so the layout is easy to judge.
// Swap `photo()` for your own files or Unsplash URLs whenever you're ready:
//   const photo = (name) => `/images/${name}.jpg`;
export const photo = (seed, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

// Full-screen menu: label, link target, and the preview shown on hover.
export const menuLinks = [
  { label: "Who it's for", href: "#audience", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978049/1_lhs7vh.jpg" },
  { label: "Pricing", href: "#pricing", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790978674/13_ynnnsj.jpg" },
  { label: "Philosophy", href: "#philosophy", img: "https://res.cloudinary.com/dbrjr5zqp/image/upload/v1790983196/agency_tomt8s.jpg" },
];