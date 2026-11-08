import { byId, PRODUCTS, money } from "../data/products.js";
import { productArt } from "../utils/art.js";
import { productCard, productMedia } from "../components/productCard.js";
import { cart } from "../store/cart.js";
import { toast } from "../components/toast.js";
import { $, $$, stars } from "../utils/dom.js";

export const productPage = {
  title(ctx) { return byId(ctx.params[0])?.name || "Product"; },
  render({ params }) {
    const p = byId(params[0]);
    if (!p) return `<section class="page-hero"><h1 class="serif page-hero__title">Not found</h1><p><a class="btn btn--forest" href="#/shop">Back to shop</a></p></section>`;
    const related = PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category).concat(PRODUCTS.filter((x) => x.id !== p.id && x.category !== p.category)).slice(0, 4);
    // three "views" of the product for the gallery
    const views = [
      productMedia(p),
      productArt(p.kind, p.tone, { sub: "30 day ritual" }),
      productArt(p.kind, { glass: p.tone.liquid, liquid: p.tone.glass, cap: p.tone.cap }, { sub: "botanical" }),
    ];
    return `
    <nav class="crumbs" aria-label="Breadcrumb"><a href="#/">Home</a><span>/</span><a href="#/shop">Shop</a><span>/</span><a href="#/shop?cat=${p.category}">${p.category}</a></nav>
    <section class="pdp">
      <div class="pdp__gallery">
        <div class="pdp__stage" id="stage" style="--scene:${p.scene}">${views[0]}</div>
        <div class="pdp__thumbs">
          ${views.map((v, i) => `<button class="thumb ${i === 0 ? "is-on" : ""}" data-view="${i}" style="--scene:${p.scene}" aria-label="View ${i + 1}">${v}</button>`).join("")}
        </div>
      </div>
      <div class="pdp__info">
        ${p.badge ? `<span class="badge badge--inline">${p.badge}</span>` : ""}
        <p class="eyebrow">${p.category}</p>
        <h1 class="serif pdp__title">${p.name}</h1>
        <p class="pdp__rating">${stars(p.rating)} <span>${p.reviews.toLocaleString()} reviews</span></p>
        <p class="pdp__tag serif">${p.tagline}</p>
        <p class="pdp__desc">${p.description}</p>

        <fieldset class="sizes"><legend class="eyebrow">Size</legend>
          ${p.sizes.map((s, i) => `<label class="size"><input type="radio" name="size" value="${s.label}" data-price="${s.price}" ${i === 0 ? "checked" : ""}/><span>${s.label} · ${money(s.price)}</span></label>`).join("")}
        </fieldset>

        <div class="pdp__buy">
          <div class="qty qty--lg" role="group" aria-label="Quantity"><button id="q-dec" aria-label="Decrease">−</button><span id="q-val">1</span><button id="q-inc" aria-label="Increase">+</button></div>
          <button class="btn btn--forest btn--grow" id="add-main">Add to cart · <span id="add-price">${money(p.sizes[0].price)}</span></button>
        </div>
        <ul class="perks"><li>Free shipping over $75</li><li>30-day skin-happy guarantee</li><li>Vegan · Cruelty-free</li></ul>

        <div class="acc">
          <details open><summary>Key ingredients</summary><ul class="tags">${p.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul></details>
          <details><summary>How to use</summary><p>${p.how}</p></details>
          <details><summary>Delivery &amp; returns</summary><p>Ships in 1–2 business days. Unopened products can be returned within 30 days.</p></details>
        </div>
      </div>
    </section>

    <section class="related">
      <div class="section-head"><p class="eyebrow">Pairs well with</p><h2 class="serif">Complete the ritual</h2></div>
      <div class="grid">${related.map(productCard).join("")}</div>
    </section>

    <div class="sticky-buy" id="sticky-buy"><div><strong>${p.name}</strong><span id="sticky-price">${money(p.sizes[0].price)}</span></div><button class="btn btn--forest" id="add-sticky">Add to cart</button></div>`;
  },
  mount(root, { params }) {
    const p = byId(params[0]); if (!p) return;
    let qty = 1;
    const views = $$(".thumb", root);
    views.forEach((b) => b.addEventListener("click", () => {
      views.forEach((x) => x.classList.toggle("is-on", x === b));
      $("#stage", root).innerHTML = b.innerHTML;
    }));
    const size = () => $("input[name=size]:checked", root);
    const price = () => Number(size().dataset.price) * qty;
    const refresh = () => {
      $("#q-val", root).textContent = qty;
      $("#add-price", root).textContent = money(price());
      $("#sticky-price", root).textContent = money(price());
    };
    $$("input[name=size]", root).forEach((i) => i.addEventListener("change", refresh));
    $("#q-inc", root).addEventListener("click", () => { qty = Math.min(qty + 1, 20); refresh(); });
    $("#q-dec", root).addEventListener("click", () => { qty = Math.max(qty - 1, 1); refresh(); });
    const add = () => { cart.add(p.id, size().value, qty); toast(`${p.name} added to cart`); };
    $("#add-main", root).addEventListener("click", add);
    $("#add-sticky", root).addEventListener("click", add);

    // sticky mobile buy bar appears once the main button leaves the viewport
    const bar = $("#sticky-buy", root);
    const io = new IntersectionObserver(([e]) => bar.classList.toggle("is-on", !e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe($("#add-main", root));
    return () => io.disconnect();
  },
};
