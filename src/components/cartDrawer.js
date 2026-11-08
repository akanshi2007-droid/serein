import { cart, FREE_SHIPPING_AT } from "../store/cart.js";
import { money } from "../data/products.js";
import { productMedia } from "./productCard.js";
import { $ } from "../utils/dom.js";
import { toast } from "./toast.js";

export function mountCart(root) {
  root.innerHTML = `
    <div class="drawer-scrim" id="drawer-scrim" hidden></div>
    <aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true" tabindex="-1">
      <header class="drawer__head">
        <h2 id="cart-title" class="serif">Your ritual</h2>
        <button class="icon-btn" id="close-cart" aria-label="Close cart">✕</button>
      </header>
      <div class="drawer__ship" id="cart-ship"></div>
      <div class="drawer__body" id="cart-body"></div>
      <footer class="drawer__foot" id="cart-foot"></footer>
    </aside>`;

  const drawer = $("#cart-drawer", root), scrim = $("#drawer-scrim", root);
  let lastFocus = null;

  const render = () => {
    const lines = cart.lines;
    const left = Math.max(0, FREE_SHIPPING_AT - cart.subtotal);
    $("#cart-ship", root).innerHTML = lines.length
      ? `<p>${left ? `You're ${money(left)} away from free shipping` : "You've unlocked free shipping"}</p>
         <div class="meter"><i style="width:${Math.min(100, (cart.subtotal / FREE_SHIPPING_AT) * 100)}%"></i></div>`
      : "";
    $("#cart-body", root).innerHTML = lines.length
      ? lines.map((l) => `
        <div class="line" data-id="${l.id}" data-size="${l.size}">
          <a class="line__art" href="#/product/${l.id}" style="--scene:${l.product.scene}" data-close>${productMedia(l.product, { sub: "" })}</a>
          <div class="line__info">
            <a class="line__name" href="#/product/${l.id}" data-close>${l.product.name}</a>
            <span class="line__size">${l.size}</span>
            <div class="qty" role="group" aria-label="Quantity">
              <button data-dec aria-label="Decrease quantity">−</button><span>${l.qty}</span><button data-inc aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="line__side"><span class="price">${money(l.price * l.qty)}</span><button class="link-btn" data-remove>Remove</button></div>
        </div>`).join("")
      : `<div class="empty"><p class="serif">Your cart is quiet.</p><a class="btn btn--forest" href="#/shop" data-close>Start your ritual</a></div>`;
    $("#cart-foot", root).innerHTML = lines.length
      ? `<div class="sum"><span>Subtotal</span><strong>${money(cart.subtotal)}</strong></div>
         <p class="sum__note">Shipping and taxes calculated at checkout.</p>
         <button class="btn btn--forest btn--block" id="checkout">Checkout</button>`
      : "";
  };

  const open = () => {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add("is-open"); scrim.classList.add("is-open"); });
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    drawer.focus();
  };
  const close = () => {
    drawer.classList.remove("is-open"); scrim.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => (scrim.hidden = true), 350);
    lastFocus?.focus?.();
  };

  root.addEventListener("click", (e) => {
    const line = e.target.closest(".line");
    if (e.target.closest("#close-cart") || e.target === scrim || e.target.closest("[data-close]")) close();
    else if (line && e.target.closest("[data-inc]")) cart.setQty(line.dataset.id, line.dataset.size, cart.lines.find((l) => l.id === line.dataset.id && l.size === line.dataset.size).qty + 1);
    else if (line && e.target.closest("[data-dec]")) cart.setQty(line.dataset.id, line.dataset.size, cart.lines.find((l) => l.id === line.dataset.id && l.size === line.dataset.size).qty - 1);
    else if (line && e.target.closest("[data-remove]")) cart.remove(line.dataset.id, line.dataset.size);
    else if (e.target.closest("#checkout")) {
      cart.clear(); close(); toast("Order placed — thank you! (mock checkout)");
    }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) close(); });

  cart.subscribe(render);
  render();
  return { open, close };
}
