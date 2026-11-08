import { cart } from "../store/cart.js";
import { CATEGORIES } from "../data/products.js";
import { $ } from "../utils/dom.js";
import { leafIcon } from "../utils/art.js";

export function mountHeader(root, openCart) {
  root.innerHTML = `
  <header class="header" id="site-header">
    <nav class="header__pill" aria-label="Primary">
      <a class="logo" href="#/" aria-label="SEREIN home"><span class="logo__leaf">${leafIcon}</span><span class="logo__word">SEREIN</span></a>
      <ul class="header__links" id="nav-links">
        <li><a href="#/shop">Shop all</a></li>
        ${CATEGORIES.map((c) => `<li><a href="#/shop?cat=${c.id}">${c.label}</a></li>`).join("")}
      </ul>
      <div class="header__actions">
        <button class="cart-btn" id="open-cart" aria-label="Open cart">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
          <span class="cart-btn__count" id="cart-count" hidden>0</span>
        </button>
        <button class="menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span></button>
      </div>
    </nav>
  </header>`;

  const count = $("#cart-count", root);
  const sync = () => {
    count.textContent = cart.count;
    count.hidden = cart.count === 0;
  };
  sync();
  const bump = () => {
    sync();
    const b = $("#open-cart", root);
    b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  };
  cart.subscribe(bump);

  $("#open-cart", root).addEventListener("click", openCart);
  const menuBtn = $("#menu-btn", root);
  const header = $("#site-header", root);
  menuBtn.addEventListener("click", () => {
    const open = header.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  root.addEventListener("click", (e) => {
    if (e.target.closest("#nav-links a")) {
      header.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // hide on scroll down, show on scroll up
  let last = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header.classList.toggle("is-hidden", y > last && y > 160 && !header.classList.contains("menu-open"));
    last = y;
  }, { passive: true });
}
