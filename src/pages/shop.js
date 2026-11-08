import { PRODUCTS, CATEGORIES, fromPrice } from "../data/products.js";
import { productCard } from "../components/productCard.js";
import { $, $$ } from "../utils/dom.js";

const SORTS = {
  featured: (a, b) => b.reviews - a.reviews,
  "price-asc": (a, b) => fromPrice(a) - fromPrice(b),
  "price-desc": (a, b) => fromPrice(b) - fromPrice(a),
  rating: (a, b) => b.rating - a.rating,
};

export const shopPage = {
  title: "Shop",
  render({ query }) {
    const cat = query.get("cat") || "all";
    const current = CATEGORIES.find((c) => c.id === cat);
    return `
    <section class="page-hero">
      <p class="eyebrow">The collection</p>
      <h1 class="serif page-hero__title">${current ? current.label : "Shop all"}</h1>
      <p class="page-hero__lede">${current ? current.blurb : "Eight essentials for a calmer, more luminous complexion."}</p>
    </section>
    <section class="shop">
      <div class="shop__bar">
        <div class="chips" role="tablist" aria-label="Filter by category">
          <a class="chip ${cat === "all" ? "is-on" : ""}" href="#/shop">All</a>
          ${CATEGORIES.map((c) => `<a class="chip ${cat === c.id ? "is-on" : ""}" href="#/shop?cat=${c.id}">${c.label}</a>`).join("")}
        </div>
        <label class="sort"><span class="visually-hidden">Sort by</span>
          <select id="sort">
            <option value="featured">Most loved</option>
            <option value="rating">Top rated</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
      <p class="shop__count" id="shop-count"></p>
      <div class="grid" id="grid"></div>
    </section>`;
  },
  mount(root, { query }) {
    const cat = query.get("cat") || "all";
    const grid = $("#grid", root), sort = $("#sort", root);
    const paint = () => {
      const list = PRODUCTS.filter((p) => cat === "all" || p.category === cat).sort(SORTS[sort.value]);
      grid.innerHTML = list.map(productCard).join("") || `<p>No products here yet.</p>`;
      $("#shop-count", root).textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
      $$(".card", grid).forEach((c, i) => { c.style.animationDelay = `${i * 60}ms`; });
    };
    sort.addEventListener("change", paint);
    paint();
  },
};
