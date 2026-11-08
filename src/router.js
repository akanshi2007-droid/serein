// Minimal hash router: #/  ·  #/shop?cat=hydrate  ·  #/product/<id>
import { homePage } from "./pages/home.js";
import { shopPage } from "./pages/shop.js";
import { productPage } from "./pages/product.js";

const routes = [
  { re: /^\/$/, page: homePage },
  { re: /^\/shop$/, page: shopPage },
  { re: /^\/product\/([\w-]+)$/, page: productPage },
];

let cleanup = null;

function parse() {
  const raw = location.hash.slice(1) || "/";
  const [path, qs] = raw.split("?");
  return { path, query: new URLSearchParams(qs || "") };
}

export function startRouter(root) {
  const render = () => {
    const { path, query } = parse();
    if (typeof cleanup === "function") cleanup();
    cleanup = null;
    window.ScrollTrigger?.getAll().forEach((t) => t.kill());
    document.body.classList.remove("is-home");

    let match = null, params = [];
    for (const r of routes) {
      const m = path.match(r.re);
      if (m) { match = r.page; params = m.slice(1); break; }
    }
    const ctx = { path, query, params };
    const page = match || {
      title: "Not found",
      render: () => `<section class="page-hero"><h1 class="serif page-hero__title">Page not found</h1><a class="btn btn--forest" href="#/">Go home</a></section>`,
    };
    root.innerHTML = page.render(ctx);
    document.body.classList.toggle("is-home", page === homePage);
    const t = typeof page.title === "function" ? page.title(ctx) : page.title;
    document.title = `${t} — SEREIN`;
    window.scrollTo(0, 0);
    cleanup = page.mount ? page.mount(root, ctx) : null;
    window.ScrollTrigger?.refresh();
  };
  window.addEventListener("hashchange", render);
  render();
}
