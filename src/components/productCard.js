import { productArt } from "../utils/art.js";
import { fromPrice, money } from "../data/products.js";
import { stars } from "../utils/dom.js";

export function productMedia(p, opts = {}) {
  return p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />`
    : productArt(p.kind, p.tone, { sub: opts.sub ?? p.category });
}

export function productCard(p) {
  return `
  <article class="card" data-product="${p.id}">
    <a class="card__media" href="#/product/${p.id}" style="--scene:${p.scene}" aria-label="View ${p.name}">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <div class="card__art">${productMedia(p)}</div>
    </a>
    <div class="card__body">
      <div class="card__meta"><span class="eyebrow">${p.category}</span>${stars(p.rating)}</div>
      <h3 class="card__title"><a href="#/product/${p.id}">${p.name}</a></h3>
      <p class="card__tag">${p.tagline}</p>
      <div class="card__foot">
        <span class="price">${p.sizes.length > 1 ? "from " : ""}${money(fromPrice(p))}</span>
        <button class="icon-btn icon-btn--add" data-add="${p.id}" aria-label="Add ${p.name} to cart">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}
