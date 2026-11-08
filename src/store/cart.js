// Tiny cart store with localStorage persistence and a subscribe() API.
import { byId } from "../data/products.js";

const KEY = "serein-cart-v1";
export const FREE_SHIPPING_AT = 75;

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};
let lines = read().filter((l) => byId(l.id));
const listeners = new Set();

const save = () => {
  try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* storage may be blocked */ }
  listeners.forEach((fn) => fn(cart));
};

const priceOf = (l) => {
  const p = byId(l.id);
  return (p.sizes.find((s) => s.label === l.size) || p.sizes[0]).price;
};

export const cart = {
  get lines() {
    return lines.map((l) => ({ ...l, product: byId(l.id), price: priceOf(l) }));
  },
  get count() { return lines.reduce((n, l) => n + l.qty, 0); },
  get subtotal() { return lines.reduce((n, l) => n + priceOf(l) * l.qty, 0); },
  add(id, size, qty = 1) {
    const p = byId(id); if (!p) return;
    size = size || p.sizes[0].label;
    const hit = lines.find((l) => l.id === id && l.size === size);
    if (hit) hit.qty = Math.min(hit.qty + qty, 20);
    else lines.push({ id, size, qty });
    save();
  },
  setQty(id, size, qty) {
    const hit = lines.find((l) => l.id === id && l.size === size);
    if (!hit) return;
    hit.qty = qty;
    if (hit.qty <= 0) lines = lines.filter((l) => l !== hit);
    save();
  },
  remove(id, size) { lines = lines.filter((l) => !(l.id === id && l.size === size)); save(); },
  clear() { lines = []; save(); },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
};
