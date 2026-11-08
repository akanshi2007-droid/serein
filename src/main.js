import { mountHeader } from "./components/header.js";
import { mountFooter } from "./components/footer.js";
import { mountCart } from "./components/cartDrawer.js";
import { startRouter } from "./router.js";
import { cart } from "./store/cart.js";
import { byId } from "./data/products.js";
import { toast } from "./components/toast.js";

history.scrollRestoration = "manual";

const cartUI = mountCart(document.getElementById("cart-root"));
mountHeader(document.getElementById("header-root"), cartUI.open);
mountFooter(document.getElementById("footer-root"));

// One delegated handler for every "quick add" button on cards and scenes
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const p = byId(btn.dataset.add);
  if (!p) return;
  cart.add(p.id, p.sizes[0].label, 1);
  toast(`${p.name} added to cart`);
});

startRouter(document.getElementById("main"));
