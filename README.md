# SEREIN — scroll-driven skincare storefront

A brand-led e-commerce frontend: cinematic home page, product listing, product detail and a working cart.
Plain HTML/CSS + ES modules and **GSAP ScrollTrigger**. There is no build step.

## Run it

```bash
npm start            # npx serve on http://localhost:5173
# or
python3 -m http.server 5173
```
ES modules need a web server, so double-clicking `index.html` will not work.
GSAP loads from the jsDelivr CDN (see the bottom of `index.html`). For offline use, save `gsap.min.js` and
`ScrollTrigger.min.js` (v3.12.x) into `src/vendor/` and point the two `<script>` tags at them.

`npm run check` syntax-checks every module and verifies imports.

## Routes (hash router)
| Route | Page |
|---|---|
| `#/` | Cinematic home story |
| `#/shop`, `#/shop?cat=hydrate` | Listing with category filter + sort |
| `#/product/<id>` | Product detail (gallery, sizes, qty, accordion, related, sticky mobile buy bar) |
| Cart | Slide-in drawer from any page; persists in `localStorage`; free-shipping meter; mock checkout |

## Structure
```
index.html
src/
  main.js              boot: header, footer, cart, router
  router.js            hash router
  data/products.js     mock catalogue (edit here; add `image:` to use real photos)
  store/cart.js        cart state + persistence
  components/          header, footer, productCard, cartDrawer, toast  (reusable)
  pages/               home, shop, product
  animations/story.js  all GSAP timelines for the home page
  utils/art.js         generated SVG bottles + botanical scenes (stand-ins for photography)
  utils/dom.js         helpers (query, splitWords, stars)
  styles/              tokens → base → components → pages → story
  assets/              logo.svg, favicon.svg, grain.svg
```

## Brand system
Ivory `#F6F1E7` · Sage `#A8B8A0` · Forest `#1E3A2C` · Clay `#C4A07A`.
Cormorant Garamond (display) + Manrope (UI). All tokens live in `src/styles/tokens.css`.

## How the scroll story works
Home sections, in order: Hero → Brand story → Ingredients → Products → Ritual → Campaign → Closing + footer.

| Scene | Technique |
|---|---|
| Hero | Pinned (`pinSpacing:false`) so the brand section slides over it (section takeover); 4 parallax layers move at different speeds; headline blurs and scales away |
| Brand | CSS `position: sticky` (not pinned); scrubbed word-by-word reveal; ivory → sage background |
| Ingredients | Pinned; arch-shaped `clip-path` expands to full screen; image scale 1.45 → 1; sage → forest |
| Products | Pinned; four scenes wipe over each other with clip-path; bottles scale and drift; progress dots |
| Ritual | Pinned; Cleanse / Hydrate / Protect chapters take over a single stage; ivory → sage → forest |
| Campaign | Sticky, not pinned; clip-path reveal; two oversized text rows slide in opposite directions |
| Closing | Word reveal; the panel lifts away to uncover a fixed footer underneath |

Rules followed: every tween is scrubbed, so scrolling up reverses it exactly; native scrolling is never hijacked;
only 4 of 7 scenes are pinned.

**Reduced motion / mobile.** `gsap.matchMedia()` gates everything.
- `prefers-reduced-motion: reduce` → no animation. The page is a clean static stacked layout.
- Width ≤ 860px → nothing is pinned; light scrubbed reveals only.
- No GSAP (CDN blocked) → same static layout. The store still works fully.

## Swapping in real photography
Set `image: "./src/assets/images/serum.jpg"` on a product in `src/data/products.js`. The art helpers in
`utils/art.js` (`gardenScene`, `editorialScene`, ...) can be replaced with `<img>` tags in `pages/home.js`.
