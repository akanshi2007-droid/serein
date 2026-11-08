import { byId, money, fromPrice } from "../data/products.js";
import { productArt, heroLayers, gardenScene, waterScene, mistScene, sunScene, editorialScene } from "../utils/art.js";
import { productMedia } from "../components/productCard.js";
import { toast } from "../components/toast.js";
import { $, $$ } from "../utils/dom.js";
import { initStory } from "../animations/story.js";

const FEATURED = [
  { id: "dew-cleansing-gel", no: "01", step: "Cleanse", bg: "#dfe7d5" },
  { id: "hydra-sage-serum", no: "02", step: "Hydrate", bg: "#c5d0bc" },
  { id: "barrier-cream", no: "03", step: "Nourish", bg: "#ede2cc" },
  { id: "daily-defense-spf50", no: "04", step: "Protect", bg: "#e6d3bb" },
];

const INGREDIENTS = [
  ["Centella", "Calms visible redness"],
  ["Green tea", "Antioxidant shield"],
  ["Squalane", "Barrier-soft moisture"],
  ["Bakuchiol", "Gentle renewal"],
];

const RITUAL = [
  { n: "01", t: "Cleanse", d: "Begin with water-soft clarity. Dew Cleansing Gel lifts the day without stripping what skin needs to keep.", pid: "dew-cleansing-gel", bg: "#efe9da", fg: "#1b241e", art: waterScene },
  { n: "02", t: "Hydrate", d: "Layer weightless moisture. Three weights of hyaluronic acid settle in as a calm, dewy veil.", pid: "hydra-sage-serum", bg: "#bccab4", fg: "#1b241e", art: mistScene },
  { n: "03", t: "Protect", d: "Close the ritual with light. Daily Defense SPF 50 guards every morning, invisibly.", pid: "daily-defense-spf50", bg: "#1e3a2c", fg: "#f6f1e7", art: sunScene },
];

export const homePage = {
  title: "Botanical skincare",
  fullBleed: true,
  render() {
    const L = heroLayers();
    return `
<div class="story" id="story">

  <!-- 01 HERO -->
  <section class="scene hero" id="hero" aria-labelledby="hero-title">
    <div class="hero__layer hero__layer--back" data-speed="0.1">${L.back}</div>
    <div class="hero__layer hero__layer--mid" data-speed="0.25">${L.mid}</div>
    <div class="hero__product" data-speed="0.4"><div class="hero__glow"></div>${productArt("dropper", { glass: "#b9cdb0", liquid: "#8fa68b", cap: "#c4a07a" }, { sub: "Hydra sage serum" })}</div>
    <div class="hero__layer hero__layer--front" data-speed="0.6">${L.front}</div>
    <div class="hero__inner">
      <p class="eyebrow hero__eyebrow">Botanical skincare · Small batch</p>
      <h1 class="hero__title serif" id="hero-title">
        <span class="line"><span class="line__i">Skin, in its</span></span>
        <span class="line"><span class="line__i"><em>calmest</em> hour.</span></span>
      </h1>
      <p class="hero__lede">Clean, quietly potent formulas grown from the garden and finished in the lab. Visible results, without the noise.</p>
      <div class="hero__cta">
        <a class="btn btn--forest" href="#/shop">Shop the ritual</a>
        <button class="btn btn--ghost" data-scroll="ritual">Discover the ritual</button>
      </div>
    </div>
    <div class="hero__scroll" aria-hidden="true"><span>Scroll</span><i></i></div>
  </section>

  <!-- 02 BRAND STORY -->
  <section class="scene brand" id="brand" aria-labelledby="brand-title">
    <div class="brand__sticky">
      <p class="eyebrow brand__eyebrow">Chapter one — Our belief</p>
      <h2 class="brand__text serif" id="brand-title" data-split>We believe skin does not need fixing. It needs listening.</h2>
      <ul class="brand__facts">
        <li><b>98%</b><span>naturally derived</span></li>
        <li><b>0</b><span>fragrance, parabens, fillers</span></li>
        <li><b>12 wk</b><span>to visible radiance</span></li>
      </ul>
    </div>
  </section>

  <!-- 03 INGREDIENTS -->
  <section class="scene ingredients" id="ingredients" aria-labelledby="ing-title">
    <div class="ing__title-block">
      <p class="eyebrow">Chapter two — The garden</p>
      <h2 class="serif ing__title" id="ing-title">Grown slowly.<br/>Bottled gently.</h2>
    </div>
    <div class="ing__frame"><div class="ing__art">${gardenScene()}</div><div class="ing__veil"></div></div>
    <div class="ing__overlay">
      <h3 class="serif ing__big">Every leaf, accounted for.</h3>
      <ul class="ing__list">
        ${INGREDIENTS.map(([n, d]) => `<li><b class="serif">${n}</b><span>${d}</span></li>`).join("")}
      </ul>
    </div>
  </section>

  <!-- 04 PRODUCTS -->
  <section class="scene products" id="products" aria-label="Featured products">
    ${FEATURED.map((f, i) => {
      const p = byId(f.id);
      return `
    <article class="pscene" data-i="${i}" style="--bg:${f.bg}">
      <span class="pscene__num serif" aria-hidden="true">${f.no}</span>
      <div class="pscene__text">
        <p class="eyebrow">${f.no} — ${f.step}</p>
        <h3 class="serif pscene__name">${p.name}</h3>
        <p class="pscene__desc">${p.tagline}</p>
        <p class="pscene__price">${money(fromPrice(p))} <span>· ${p.sizes[0].label}</span></p>
        <div class="pscene__cta">
          <button class="btn btn--forest" data-add="${p.id}">Add to cart</button>
          <a class="btn btn--ghost" href="#/product/${p.id}">View details</a>
        </div>
      </div>
      <div class="pscene__art"><div class="pscene__halo"></div>${productMedia(p, { sub: f.step })}</div>
    </article>`;
    }).join("")}
    <ol class="prod__dots" aria-hidden="true">${FEATURED.map(() => `<li></li>`).join("")}</ol>
  </section>

  <!-- 05 RITUAL -->
  <section class="scene ritual" id="ritual" aria-labelledby="ritual-title">
    <div class="ritual__head"><p class="eyebrow">Chapter three — The ritual</p><h2 id="ritual-title" class="visually-hidden">Cleanse, hydrate, protect</h2></div>
    <div class="ritual__stage">
      ${RITUAL.map((r, i) => `
      <div class="rchapter" data-i="${i}" style="--bg:${r.bg};--fg:${r.fg}">
        <div class="rchapter__text">
          <span class="rchapter__n serif">${r.n}</span>
          <h3 class="serif rchapter__t">${r.t}</h3>
          <p>${r.d}</p>
          <a class="btn btn--line" href="#/product/${r.pid}">Meet ${byId(r.pid).name}</a>
        </div>
        <div class="rchapter__art"><div class="rchapter__bg">${r.art()}</div><div class="rchapter__prod">${productMedia(byId(r.pid), { sub: r.t })}</div></div>
      </div>`).join("")}
      <ol class="ritual__rail" aria-hidden="true">${RITUAL.map((r) => `<li><i></i><span>${r.t}</span></li>`).join("")}</ol>
    </div>
  </section>

  <!-- 06 CAMPAIGN -->
  <section class="scene campaign" id="campaign" aria-labelledby="camp-title">
    <div class="camp__sticky">
      <div class="camp__img">${editorialScene()}</div>
      <div class="camp__shade"></div>
      <h2 class="camp__text serif" id="camp-title" aria-label="Quiet is the new luxury.">
        <span class="camp__row camp__row--a" aria-hidden="true">Quiet is the</span>
        <span class="camp__row camp__row--b" aria-hidden="true">new <em>luxury.</em></span>
      </h2>
      <p class="camp__cap">The Spring Ritual Edit — available now</p>
    </div>
  </section>

  <!-- 07 CLOSING -->
  <section class="scene closing" id="closing" aria-labelledby="close-title">
    <div class="closing__inner">
      <p class="eyebrow">Chapter four — Begin</p>
      <h2 class="serif closing__title" id="close-title" data-split>Begin gently. Glow slowly.</h2>
      <p class="closing__lede">Join the ritual list for early access, skin notes and 10% off your first order.</p>
      <form class="signup" id="signup">
        <label class="visually-hidden" for="email">Email</label>
        <input id="email" type="email" placeholder="your@email.com" required />
        <button class="btn btn--forest" type="submit">Join</button>
      </form>
      <a class="btn btn--line" href="#/shop">Explore all products</a>
    </div>
  </section>
</div>
`;
  },
  mount(root) {
    $("#signup", root).addEventListener("submit", (e) => {
      e.preventDefault();
      e.target.reset();
      toast("Welcome to the ritual list.");
    });
    return initStory(root);
  },
};
