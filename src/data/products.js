// Mock catalogue. Swap `image` for a real photo path (e.g. "./src/assets/images/serum.jpg")
// and the UI will use it instead of the generated SVG bottle.

export const CATEGORIES = [
  { id: "cleanse", label: "Cleanse", blurb: "Soft, rinse-clean, never stripping." },
  { id: "hydrate", label: "Hydrate", blurb: "Layered moisture that stays." },
  { id: "protect", label: "Protect", blurb: "Barrier care for every season." },
  { id: "treat", label: "Treat", blurb: "Targeted, patient, gentle." },
];

export const PRODUCTS = [
  {
    id: "dew-cleansing-gel",
    name: "Dew Cleansing Gel",
    category: "cleanse",
    tagline: "A cloud-soft gel that lifts the day away.",
    description:
      "A low-foam gel cleanser with green tea and aloe leaf that dissolves sunscreen and city grime while leaving the skin barrier calm and comfortable.",
    kind: "pump",
    tone: { glass: "#cfdac6", liquid: "#a9be9d", cap: "#1e3a2c" },
    scene: "#dfe7d5",
    sizes: [{ label: "150 ml", price: 28 }, { label: "300 ml", price: 46 }],
    rating: 4.8, reviews: 1284, badge: "Bestseller",
    ingredients: ["Green tea leaf", "Aloe vera", "Glycerin", "Panthenol"],
    how: "Massage onto damp skin morning and night. Rinse with lukewarm water.",
    image: null,
  },
  {
    id: "milk-toner",
    name: "Oat Milk Toner",
    category: "cleanse",
    tagline: "Resets skin after cleansing in one soft sweep.",
    description:
      "A silky, no-alcohol toner with colloidal oat and rose water that rebalances and prepares skin to drink in what comes next.",
    kind: "pump",
    tone: { glass: "#efe5d2", liquid: "#e7d6bb", cap: "#7e947c" },
    scene: "#efe6d4",
    sizes: [{ label: "120 ml", price: 30 }],
    rating: 4.7, reviews: 652, badge: null,
    ingredients: ["Colloidal oat", "Rose water", "Betaine"],
    how: "Press into clean skin with palms or a cotton pad.",
    image: null,
  },
  {
    id: "hydra-sage-serum",
    name: "Hydra Sage Serum",
    category: "hydrate",
    tagline: "Three weights of hyaluronic acid, one dewy finish.",
    description:
      "Our signature serum blends triple-weight hyaluronic acid with centella and sage extract. Plumps, soothes and layers beautifully under cream.",
    kind: "dropper",
    tone: { glass: "#b9cdb0", liquid: "#8fa68b", cap: "#c4a07a" },
    scene: "#c5d0bc",
    sizes: [{ label: "30 ml", price: 49 }, { label: "50 ml", price: 72 }],
    rating: 4.9, reviews: 2310, badge: "Bestseller",
    ingredients: ["Hyaluronic acid (3 weights)", "Centella asiatica", "Sage extract", "Vitamin B5"],
    how: "Apply 3–4 drops to damp skin, morning and night, before moisturiser.",
    image: null,
  },
  {
    id: "barrier-cream",
    name: "Barrier Cream",
    category: "hydrate",
    tagline: "Rich, cushioned comfort for a resilient barrier.",
    description:
      "A whipped ceramide cream with squalane and shea that wraps skin in lasting comfort without heaviness. Made for dry, sensitive and winter skin.",
    kind: "jar",
    tone: { glass: "#efe3cd", liquid: "#e9dcc2", cap: "#1e3a2c" },
    scene: "#ede2cc",
    sizes: [{ label: "50 ml", price: 42 }],
    rating: 4.7, reviews: 1870, badge: null,
    ingredients: ["Ceramide NP", "Squalane", "Shea butter", "Allantoin"],
    how: "Warm a pea-sized amount between fingertips and press onto face and neck.",
    image: null,
  },
  {
    id: "daily-defense-spf50",
    name: "Daily Defense SPF 50",
    category: "protect",
    tagline: "Weightless mineral-hybrid sun care, no white cast.",
    description:
      "A broad-spectrum SPF 50 that disappears into skin and wears beautifully under makeup. Enriched with niacinamide and green tea antioxidants.",
    kind: "tube",
    tone: { glass: "#f3e8d6", liquid: "#f3e8d6", cap: "#c4a07a" },
    scene: "#f0e3cb",
    sizes: [{ label: "50 ml", price: 38 }],
    rating: 4.9, reviews: 3055, badge: "New",
    ingredients: ["Zinc oxide", "Niacinamide", "Green tea", "Vitamin E"],
    how: "Apply generously as the final morning step. Reapply every two hours in sun.",
    image: null,
  },
  {
    id: "overnight-repair-oil",
    name: "Overnight Repair Oil",
    category: "treat",
    tagline: "Bakuchiol and rosehip while you sleep.",
    description:
      "A featherlight facial oil with bakuchiol, rosehip and squalane. Visibly smooths and restores radiance overnight, with no retinol irritation.",
    kind: "oil",
    tone: { glass: "#c79a62", liquid: "#b8843f", cap: "#1e3a2c" },
    scene: "#e6d3bb",
    sizes: [{ label: "30 ml", price: 54 }],
    rating: 4.8, reviews: 940, badge: null,
    ingredients: ["Bakuchiol", "Rosehip oil", "Squalane", "Tocopherol"],
    how: "Press 2–3 drops over moisturiser at night.",
    image: null,
  },
  {
    id: "clay-calm-mask",
    name: "Calm Clay Mask",
    category: "treat",
    tagline: "Weekly clarity without the tightness.",
    description:
      "Kaolin and green clay balanced with oat and bisabolol. Clears pores and softens texture while keeping skin comfortable.",
    kind: "jar",
    tone: { glass: "#b7c4ad", liquid: "#8fa68b", cap: "#7e947c" },
    scene: "#d6dfcb",
    sizes: [{ label: "75 ml", price: 36 }],
    rating: 4.6, reviews: 512, badge: null,
    ingredients: ["Kaolin", "Green clay", "Bisabolol", "Colloidal oat"],
    how: "Apply an even layer, leave 8 minutes, rinse. Use once or twice a week.",
    image: null,
  },
  {
    id: "petal-lip-balm",
    name: "Petal Lip Balm",
    category: "hydrate",
    tagline: "A tinted-clear balm that feels like silk.",
    description:
      "Plant waxes, jojoba and a whisper of rose pigment for soft, glossy, all-day comfort.",
    kind: "tube",
    tone: { glass: "#e6c3b4", liquid: "#e6c3b4", cap: "#1e3a2c" },
    scene: "#f0ddd0",
    sizes: [{ label: "15 ml", price: 18 }],
    rating: 4.8, reviews: 1120, badge: null,
    ingredients: ["Jojoba", "Candelilla wax", "Rose pigment"],
    how: "Swipe on whenever lips need comfort.",
    image: null,
  },
];

export const byId = (id) => PRODUCTS.find((p) => p.id === id);
export const fromPrice = (p) => Math.min(...p.sizes.map((s) => s.price));
export const money = (n) => `$${Number(n).toFixed(n % 1 ? 2 : 0)}`;
