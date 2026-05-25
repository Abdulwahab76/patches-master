import { PatchProduct } from "./types";

export const PRODUCTS: PatchProduct[] = [
  {
    id: "emb-01",
    name: "Premium Embroidered Patches",
    description:
      "The industry standard. High-density stitching for classic brand representation.",
    image:
      "https://avatars.mds.yandex.net/i?id=8417bd2f9c4208c73aa62be6cf864b30ee80ee98-10815668-images-thumbs&n=13",
    category: "Embroidered",
    priceStart: 0.85,
  },
  {
    id: "che-01",
    name: "Varsity Chenille Patches",
    description:
      "Fuzzy, textured patches perfect for sports teams, school jackets, and vintage aesthetics.",
    image: "https://m.media-amazon.com/images/I/81OYRVkNQNL.jpg",
    category: "Chenille",
    priceStart: 1.2,
  },
  {
    id: "pvc-01",
    name: "3D PVC Rubber Patches",
    description:
      "Waterproof and durable. Ideal for outdoor gear, uniforms, and tactical equipment.",
    image:
      "https://s.alicdn.com/@sc04/kf/Ha4a2270248734ea083b156049a86ff80T.jpg_300x300.jpg",
    category: "PVC",
    priceStart: 1.45,
  },
  {
    id: "sil-01",
    name: "Soft Silicone Patches",
    description:
      "Ultra-flexible with a premium matte finish. Perfect for activewear and luxury brands.",
    image:
      "https://avatars.mds.yandex.net/i?id=d61a76db8d97dfd905e3e6c78cf60bfffa0ac53b-4141662-images-thumbs&n=13",
    category: "Silicone",
    priceStart: 1.6,
  },
  {
    id: "lea-01",
    name: "Genuine Leather Patches",
    description:
      "Laser-etched or debossed for a rugged, sophisticated look. Great for hats and denim.",
    image:
      "https://s.alicdn.com/@sc04/kf/H82f61879cb9c48318048e42a9b910de2E.png_300x300.jpg",
    category: "Leather",
    priceStart: 2.1,
  },
  {
    id: "wov-01",
    name: "High-Definition Woven Patches",
    description:
      "Thinner threads allow for extreme detail and legibility of small text.",
    image:
      "https://avatars.mds.yandex.net/i?id=940fe561973c8b39058fa5c5957448c29c5ff073-5424538-images-thumbs&n=13",
    category: "Woven",
    priceStart: 0.75,
  },
  {
    id: "sub-01",
    name: "Sublimated Printed Patches",
    description:
      "Photo-realistic quality with unlimited colors and gradients via dye sublimation.",
    image:
      "https://s.alicdn.com/@sc04/kf/H91491a7a23e4487ea9c518fd043261b2Y.jpg_300x300.jpg",
    category: "Sublimated",
    priceStart: 1.1,
  },
  {
    id: "met-01",
    name: "Metflex Metallic Patches",
    description:
      "3D metallic effects that offer a modern, high-tech aesthetic for premium branding.",
    image:
      "https://s.alicdn.com/@sc04/kf/H3b1a5d826e8743a6966f58111f6f819eh.jpg_300x300.jpg",
    category: "Metflex",
    priceStart: 2.5,
  },
];

export const CATEGORIES: { name: string; slug: string }[] = [
  { name: "Embroidered", slug: "embroidered" },
  { name: "Chenille", slug: "chenille" },
  { name: "PVC", slug: "pvc" },
  { name: "Silicone", slug: "silicone" },
  { name: "Leather", slug: "leather" },
  { name: "Woven", slug: "woven" },
  { name: "Sublimated", slug: "sublimated" },
  { name: "Metflex", slug: "metflex" },
];

// Exporting PROCESS_STEPS for use in ProcessSection component
export const PROCESS_STEPS = [
  {
    title: "Consultation",
    desc: "Share your ideas and artwork with our specialists to define your project requirements.",
  },
  {
    title: "Digital Proof",
    desc: "Receive and approve a high-resolution mockup of your custom design within 2 hours.",
  },
  {
    title: "Precision Crafting",
    desc: "Our artisans use state-of-the-art machinery to create your high-quality custom patches.",
  },
  {
    title: "Fast Shipping",
    desc: "Your finished order is shipped globally with tracked express delivery directly to you.",
  },
];
