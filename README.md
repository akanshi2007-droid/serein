# SEREIN. — Scroll-Driven Skincare Storefront

**A little care. A lot of glow.**

A modern, brand-focused skincare e-commerce experience featuring cinematic scroll storytelling, immersive transitions and a fully interactive shopping journey.

🔗 **Live Demo:** https://serein-chi.vercel.app/

---

## ✨ Overview

SEREIN is a premium skincare storefront designed around a minimal botanical aesthetic and an immersive browsing experience.

Rather than following a conventional e-commerce layout, the homepage uses scroll-driven storytelling to guide visitors through the brand, ingredients, products and skincare rituals.

The project combines creative frontend design with practical shopping functionality, including product discovery, detailed product pages and a persistent shopping cart.

## 🎨 Design & Experience

- **Cinematic Homepage:** Full-screen sections with immersive visual storytelling.
- **Scroll-Driven Animations:** Pinned scenes, layered transitions, parallax and section takeovers.
- **Editorial Typography:** Elegant headings paired with clean, modern UI typography.
- **Product Presentation:** Interactive product cards, detailed galleries and product information.
- **Responsive Design:** Adapted layouts and animations for desktop, tablet and mobile.
- **Botanical Aesthetic:** A cohesive visual identity inspired by nature and minimal skincare branding.

## 🛍️ Features

### Homepage
- Cinematic hero introduction.
- Animated brand storytelling.
- Interactive ingredient showcase.
- Featured product collection.
- Cleanse, Hydrate and Protect skincare ritual.
- Editorial campaign and closing sections.

### Shop
- Product listing and category filtering.
- Sorting functionality.
- Responsive product grid.
- Quick product discovery.

### Product Details
- Product image gallery.
- Product descriptions and benefits.
- Ingredient information.
- Size and quantity selection.
- Related product recommendations.
- Sticky mobile purchase bar.

### Shopping Cart
- Slide-in cart drawer.
- Add, remove and update products.
- Persistent cart using LocalStorage.
- Free-shipping progress indicator.
- Subtotal calculation.
- Mock checkout flow.

## 🎬 Scroll Animation System

The homepage uses **GSAP and ScrollTrigger** to create a continuous, scroll-driven visual experience.

| Section | Animation |
|---|---|
| Hero | Pinned introduction with layered parallax |
| Brand Story | Sticky layout with word-by-word text reveal |
| Ingredients | Expanding arch-shaped image reveal |
| Products | Full-screen product scene transitions |
| Ritual | Pinned Cleanse, Hydrate and Protect chapters |
| Campaign | Image reveal with oversized moving typography |
| Closing | Animated text reveal and footer transition |

All scroll animations are scrubbed, allowing transitions to reverse naturally when scrolling upward.

### Performance & Accessibility
- Native scrolling without forced scroll hijacking.
- Reduced-motion support.
- Responsive animation behaviour.
- Static fallback if GSAP is unavailable.
- Mobile-friendly layouts without pinned sections.

## 🧰 Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling, layouts and transitions |
| JavaScript (ES Modules) | Application logic |
| GSAP 3 | Animation timelines |
| ScrollTrigger | Scroll-based storytelling |
| LocalStorage | Cart persistence |
| Vercel | Deployment |

No framework or build step is required.

## 📁 Project Structure

```text
serein/
├── index.html
├── package.json
├── src/
│   ├── main.js
│   ├── router.js
│   ├── data/
│   │   └── products.js
│   ├── store/
│   │   └── cart.js
│   ├── components/
│   │   ├── header.js
│   │   ├── footer.js
│   │   ├── productCard.js
│   │   ├── cartDrawer.js
│   │   └── toast.js
│   ├── pages/
│   │   ├── home.js
│   │   ├── shop.js
│   │   └── product.js
│   ├── animations/
│   │   └── story.js
│   ├── utils/
│   │   ├── art.js
│   │   └── dom.js
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       ├── components/
│       ├── pages/
│       └── story.css
└── assets/
    ├── logo.svg
    ├── favicon.svg
    └── grain.svg
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm (for the npm-based server).
- A modern browser.

### Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Navigate to the project directory:

```bash
cd serein
```

3. Start the local server:

```bash
npm start
```

Alternatively, use Python:

```bash
python3 -m http.server 5173
```

4. Open:

```text
http://localhost:5173
```

**Note:** ES Modules require a local server. Opening `index.html` directly in the browser will not work.

### Available Scripts

```bash
npm start
npm run check
```

- `npm start` — Starts the local development server.
- `npm run check` — Syntax-checks JavaScript modules and verifies imports.

## 🎨 Brand System

| Element | Choice |
|---|---|
| Primary | Ivory `#F6F1E7` |
| Secondary | Sage `#A8B8A0` |
| Accent | Forest `#1E3A2C` |
| Highlight | Clay `#C4A07A` |
| Display Font | Cormorant Garamond |
| UI Font | Manrope |

The design focuses on natural tones, generous whitespace, elegant typography and understated interactions.

## 🖼️ Customising Product Images

Product information is maintained in:

```text
src/data/products.js
```

To use real product photography, add an image path to the relevant product:

```js
image: "./src/assets/images/serum.jpg"
```

The generated SVG illustrations in `src/utils/art.js` can also be replaced with custom product and botanical photography.

## 💡 Design Philosophy

SEREIN explores how an e-commerce website can become more than a catalogue of products.

By combining editorial layouts, scroll-driven storytelling and functional shopping interactions, the experience aims to make product discovery feel natural, engaging and memorable.

**Designed to be explored, not just browsed.**

---

**SEREIN. — Skincare, Simplified.**
