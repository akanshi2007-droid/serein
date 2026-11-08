import { CATEGORIES } from "../data/products.js";

export function mountFooter(root) {
  root.innerHTML = `
  <footer class="footer" id="site-footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <p class="footer__mark serif">SEREIN</p>
        <p class="footer__line">Botanical skincare, grown slowly and made in small batches.</p>
      </div>
      <div class="footer__cols">
        <div><h4>Shop</h4><ul>
          <li><a href="#/shop">All products</a></li>
          ${CATEGORIES.map((c) => `<li><a href="#/shop?cat=${c.id}">${c.label}</a></li>`).join("")}
        </ul></div>
        <div><h4>Care</h4><ul><li><a href="#/">Shipping</a></li><li><a href="#/">Returns</a></li><li><a href="#/">Skin quiz</a></li></ul></div>
        <div><h4>Follow</h4><ul><li><a href="#/">Instagram</a></li><li><a href="#/">Journal</a></li><li><a href="#/">Pinterest</a></li></ul></div>
      </div>
    </div>
    <p class="footer__legal">© 2026 SEREIN. Mock storefront for demonstration.</p>
  </footer>`;
}
