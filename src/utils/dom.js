export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Wrap each word of an element's text in spans so it can be revealed word by word.
export function splitWords(el) {
  const text = el.textContent.trim().replace(/\s+/g, " ");
  el.setAttribute("aria-label", text);
  el.innerHTML = text
    .split(" ")
    .map((w) => `<span class="w" aria-hidden="true"><span class="w__i">${w}</span></span>`)
    .join(" ");
  return $$(".w__i", el);
}

export const stars = (rating) =>
  `<span class="stars" role="img" aria-label="${rating} out of 5">★ <b>${rating.toFixed(1)}</b></span>`;
