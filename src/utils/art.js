// Generated SVG artwork: product bottles and botanical scenes.
// These stand in for photography. Replace with real images when you have them.

let uid = 0;
const nid = (p) => `${p}${++uid}`;

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- product bottles (viewBox 0 0 200 320) ---------- */
export function productArt(kind = "dropper", tone = {}, opts = {}) {
  const { glass = "#b9cdb0", liquid = "#8fa68b", cap = "#c4a07a" } = tone;
  const label = opts.label || "SEREIN";
  const sub = opts.sub || "";
  const g = nid("g"), l = nid("l"), s = nid("s");
  const defs = `
    <defs>
      <linearGradient id="${g}" x1="0" x2="1">
        <stop offset="0" stop-color="${glass}" stop-opacity=".95"/>
        <stop offset=".45" stop-color="#ffffff" stop-opacity=".55"/>
        <stop offset="1" stop-color="${glass}" stop-opacity=".9"/>
      </linearGradient>
      <linearGradient id="${l}" x1="0" x2="1">
        <stop offset="0" stop-color="${liquid}"/><stop offset=".5" stop-color="${liquid}" stop-opacity=".8"/><stop offset="1" stop-color="${liquid}"/>
      </linearGradient>
      <linearGradient id="${s}" x1="0" x2="1">
        <stop offset="0" stop-color="${cap}"/><stop offset=".4" stop-color="#ffffff" stop-opacity=".45"/><stop offset="1" stop-color="${cap}"/>
      </linearGradient>
      <radialGradient id="${s}sh"><stop offset="0" stop-color="#142a1f" stop-opacity=".32"/><stop offset="1" stop-color="#142a1f" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="100" cy="304" rx="70" ry="9" fill="url(#${s}sh)"/>`;
  const labelBox = (x, y, w, h) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#f6f1e7" opacity=".94"/>
    <text x="${x + w / 2}" y="${y + h * 0.42}" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-size="${Math.min(14, w / 6.2)}" letter-spacing="2.4" fill="#1e3a2c">${label}</text>
    <line x1="${x + w * 0.3}" x2="${x + w * 0.7}" y1="${y + h * 0.54}" y2="${y + h * 0.54}" stroke="#7e947c" stroke-width=".8"/>
    <text x="${x + w / 2}" y="${y + h * 0.74}" text-anchor="middle" font-family="Manrope, sans-serif" font-size="4.2" letter-spacing=".8" fill="#4b5a4f">${sub.toUpperCase()}</text>`;
  const shine = (x, y, h) => `<rect x="${x}" y="${y}" width="6" height="${h}" rx="3" fill="#fff" opacity=".4"/>`;

  let body = "";
  switch (kind) {
    case "jar":
      body = `
        <rect x="28" y="168" width="144" height="116" rx="22" fill="url(#${g})"/>
        <rect x="34" y="196" width="132" height="82" rx="16" fill="url(#${l})" opacity=".55"/>
        <rect x="22" y="124" width="156" height="52" rx="12" fill="url(#${s})"/>
        <rect x="22" y="170" width="156" height="6" fill="#000" opacity=".12"/>
        ${labelBox(56, 200, 88, 62)}${shine(38, 178, 90)}`;
      break;
    case "tube":
      body = `
        <rect x="62" y="262" width="76" height="40" rx="8" fill="url(#${s})"/>
        <path d="M54 34 H146 L140 264 H60 Z" fill="url(#${g})"/>
        <rect x="54" y="24" width="92" height="16" rx="3" fill="url(#${g})"/>
        <g stroke="#000" opacity=".1">${[0, 1, 2, 3, 4].map((i) => `<line x1="58" x2="142" y1="${27 + i * 2.6}" y2="${27 + i * 2.6}"/>`).join("")}</g>
        ${labelBox(66, 100, 68, 110)}${shine(62, 50, 190)}`;
      break;
    case "pump":
      body = `
        <rect x="56" y="124" width="88" height="170" rx="20" fill="url(#${g})"/>
        <rect x="62" y="170" width="76" height="118" rx="14" fill="url(#${l})" opacity=".6"/>
        <rect x="84" y="102" width="32" height="26" rx="4" fill="url(#${s})"/>
        <rect x="93" y="62" width="14" height="42" rx="3" fill="url(#${s})"/>
        <path d="M84 52 h58 a6 6 0 0 1 6 6 v6 a6 6 0 0 1 -6 6 h-58 z" fill="url(#${s})"/>
        ${labelBox(68, 178, 64, 84)}${shine(64, 134, 130)}`;
      break;
    case "oil":
      body = `
        <rect x="64" y="140" width="72" height="150" rx="18" fill="url(#${g})"/>
        <rect x="68" y="176" width="64" height="108" rx="14" fill="url(#${l})" opacity=".85"/>
        <rect x="86" y="118" width="28" height="26" rx="3" fill="url(#${s})"/>
        <rect x="82" y="100" width="36" height="20" rx="4" fill="url(#${s})"/>
        <rect x="90" y="42" width="20" height="60" rx="10" fill="#1b241e"/>
        ${labelBox(72, 190, 56, 72)}${shine(68, 148, 110)}`;
      break;
    case "dropper":
    default:
      body = `
        <rect x="52" y="124" width="96" height="170" rx="24" fill="url(#${g})"/>
        <rect x="58" y="170" width="84" height="118" rx="18" fill="url(#${l})" opacity=".6"/>
        <rect x="84" y="104" width="32" height="24" rx="3" fill="url(#${g})"/>
        <rect x="76" y="86" width="48" height="22" rx="5" fill="url(#${s})"/>
        <rect x="87" y="26" width="26" height="62" rx="13" fill="#1b241e"/>
        ${labelBox(66, 178, 68, 84)}${shine(58, 134, 130)}`;
  }
  return `<svg class="art art--product" viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label} ${sub}" preserveAspectRatio="xMidYMax meet">${defs}${body}</svg>`;
}

/* ---------- botanical building blocks ---------- */
const LEAF = "M0 0 C26 -34 84 -56 140 -46 C132 4 82 40 0 0 Z";
const leaf = (x, y, rot, scale, fill, vein) =>
  `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${scale.toFixed(2)})">
     <path d="${LEAF}" fill="${fill}"/><path d="M0 0 C40 -14 90 -22 134 -40" stroke="${vein}" stroke-width="1.4" fill="none" opacity=".5"/></g>`;

function cluster(seed, n, box, palette, vein = "#f6f1e7", scale = [0.7, 1.7]) {
  const r = rng(seed);
  let out = "";
  for (let i = 0; i < n; i++) {
    const x = box.x + r() * box.w, y = box.y + r() * box.h;
    out += leaf(x, y, r() * 360, scale[0] + r() * (scale[1] - scale[0]), palette[Math.floor(r() * palette.length)], vein);
  }
  return out;
}

const GREENS = ["#2f5a43", "#3d6f53", "#4f8465", "#6f9b7c", "#8fb394"];
const DEEP = ["#16301f", "#1e3a2c", "#264a37", "#2f5a43", "#3d6f53"];
const SAGE = ["#8fa68b", "#a8b8a0", "#7e947c", "#c5d0bc"];

const svg = (w, h, inner, cls = "") =>
  `<svg class="art ${cls}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${inner}</svg>`;

/* Hero backdrop layers — returned separately so they can move at different speeds */
export function heroLayers() {
  return {
    back: svg(1600, 1000, `
      <defs><linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f1e7"/><stop offset="1" stop-color="#dfe5d3"/></linearGradient></defs>
      <rect width="1600" height="1000" fill="url(#hb)"/>
      <circle cx="1090" cy="430" r="300" fill="#e9cfae" opacity=".55"/>
      <circle cx="1090" cy="430" r="210" fill="#e6c49a" opacity=".5"/>`, "hero-art"),
    mid: svg(1600, 1000, `
      <path d="M840 1000 V470 a250 250 0 0 1 500 0 V1000 Z" fill="#c5d0bc" opacity=".7"/>
      <path d="M900 1000 V490 a190 190 0 0 1 380 0 V1000 Z" fill="#a8b8a0" opacity=".55"/>`, "hero-art"),
    front: svg(1600, 1000, `
      ${cluster(7, 9, { x: -90, y: 830, w: 420, h: 220 }, GREENS, "#f6f1e7", [0.6, 1.3])}
      ${cluster(11, 9, { x: 1380, y: 700, w: 300, h: 340 }, GREENS, "#f6f1e7", [0.6, 1.3])}
      ${cluster(19, 6, { x: 80, y: 60, w: 300, h: 160 }, SAGE, "#f6f1e7", [0.6, 1.1])}`, "hero-art"),
  };
}

/* Large full-bleed botanical for the ingredients scene */
export function gardenScene(seed = 3) {
  const r = rng(seed);
  let dots = "";
  for (let i = 0; i < 46; i++) dots += `<circle cx="${(r() * 1600).toFixed(0)}" cy="${(r() * 1000).toFixed(0)}" r="${(1 + r() * 3).toFixed(1)}" fill="#e6d3bb" opacity="${(0.15 + r() * 0.4).toFixed(2)}"/>`;
  return svg(1600, 1000, `
    <defs><radialGradient id="gg" cx=".5" cy=".4" r=".85"><stop offset="0" stop-color="#3d6f53"/><stop offset=".6" stop-color="#244433"/><stop offset="1" stop-color="#102418"/></radialGradient></defs>
    <rect width="1600" height="1000" fill="url(#gg)"/>
    ${cluster(seed, 46, { x: -80, y: -40, w: 1760, h: 1100 }, DEEP, "#a8b8a0", [0.9, 2.6])}
    ${cluster(seed + 5, 22, { x: 0, y: 0, w: 1600, h: 1000 }, GREENS, "#f6f1e7", [0.7, 1.6])}
    ${dots}`, "garden-art");
}

export function waterScene() {
  let rings = "";
  for (let i = 1; i <= 7; i++) rings += `<circle cx="600" cy="520" r="${i * 70}" fill="none" stroke="#7e947c" stroke-width="${i % 2 ? 1.2 : 0.6}" opacity="${(0.55 - i * 0.06).toFixed(2)}"/>`;
  return svg(1200, 1000, `
    <defs><radialGradient id="wg" cx=".5" cy=".52" r=".7"><stop offset="0" stop-color="#f3f1e6"/><stop offset="1" stop-color="#cdd8c6"/></radialGradient></defs>
    <rect width="1200" height="1000" fill="url(#wg)"/>${rings}
    <circle cx="600" cy="520" r="46" fill="#a8b8a0" opacity=".35"/>
    ${cluster(31, 9, { x: -40, y: 700, w: 480, h: 360 }, SAGE, "#f6f1e7")}
    ${cluster(33, 9, { x: 800, y: -60, w: 460, h: 300 }, SAGE, "#f6f1e7")}`, "ritual-art");
}

export function mistScene() {
  return svg(1200, 1000, `
    <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dbe5d4"/><stop offset="1" stop-color="#9fb49a"/></linearGradient>
    <radialGradient id="mgl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f6f1e7" stop-opacity=".9"/><stop offset="1" stop-color="#f6f1e7" stop-opacity="0"/></radialGradient></defs>
    <rect width="1200" height="1000" fill="url(#mg)"/>
    <circle cx="420" cy="360" r="320" fill="url(#mgl)"/><circle cx="820" cy="560" r="260" fill="url(#mgl)" opacity=".7"/>
    <path d="M0 760 C220 700 360 820 600 760 S1000 700 1200 770 V1000 H0 Z" fill="#7e947c" opacity=".45"/>
    <path d="M0 840 C260 780 420 900 680 830 S1040 800 1200 850 V1000 H0 Z" fill="#5e7b62" opacity=".5"/>
    ${cluster(41, 10, { x: 700, y: 640, w: 560, h: 420 }, GREENS, "#f6f1e7")}`, "ritual-art");
}

export function sunScene() {
  return svg(1200, 1000, `
    <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a4a39"/><stop offset="1" stop-color="#142a1f"/></linearGradient></defs>
    <rect width="1200" height="1000" fill="url(#sg)"/>
    <circle cx="600" cy="430" r="250" fill="#e6c49a" opacity=".22"/>
    <circle cx="600" cy="430" r="170" fill="#e6c49a" opacity=".38"/>
    <circle cx="600" cy="430" r="96" fill="#f0d8b4"/>
    ${[...Array(16)].map((_, i) => { const a = (i / 16) * Math.PI * 2; return `<line x1="${600 + Math.cos(a) * 280}" y1="${430 + Math.sin(a) * 280}" x2="${600 + Math.cos(a) * 340}" y2="${430 + Math.sin(a) * 340}" stroke="#e6c49a" stroke-width="2" opacity=".45"/>`; }).join("")}
    ${cluster(51, 12, { x: -60, y: 700, w: 520, h: 360 }, DEEP, "#a8b8a0")}
    ${cluster(53, 12, { x: 760, y: 700, w: 520, h: 360 }, DEEP, "#a8b8a0")}`, "ritual-art");
}

/* Campaign "photograph": arch light, plinth and a still life */
export function editorialScene() {
  return svg(1600, 1000, `
    <defs>
      <linearGradient id="eb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#274936"/><stop offset="1" stop-color="#10241a"/></linearGradient>
      <linearGradient id="ea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f1e7" stop-opacity=".95"/><stop offset="1" stop-color="#c5d0bc" stop-opacity=".75"/></linearGradient>
      <linearGradient id="ep" x1="0" x2="1"><stop offset="0" stop-color="#d9cfb8"/><stop offset=".5" stop-color="#f0e8d6"/><stop offset="1" stop-color="#cbbfa5"/></linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#eb)"/>
    <path d="M520 1000 V400 a280 280 0 0 1 560 0 V1000 Z" fill="url(#ea)" opacity=".92"/>
    <path d="M580 1000 V410 a220 220 0 0 1 440 0 V1000 Z" fill="#f6f1e7" opacity=".4"/>
    <rect x="470" y="760" width="660" height="240" rx="18" fill="#e3d9c2"/>
    <rect x="470" y="760" width="660" height="26" rx="8" fill="#f2ead8"/>
    <g transform="translate(560 430) scale(.9)">${productArt("dropper", { glass: "#b9cdb0", liquid: "#8fa68b", cap: "#c4a07a" }).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</g>
    <svg x="760" y="420" width="190" height="304" viewBox="0 0 200 320">${productArt("jar", { glass: "#efe3cd", liquid: "#e9dcc2", cap: "#1e3a2c" }).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg>
    <svg x="920" y="400" width="170" height="272" viewBox="0 0 200 320">${productArt("tube", { glass: "#f3e8d6", liquid: "#f3e8d6", cap: "#c4a07a" }).replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "")}</svg>
    ${cluster(61, 16, { x: -80, y: 500, w: 560, h: 560 }, DEEP, "#a8b8a0", [1, 2.4])}
    ${cluster(63, 16, { x: 1140, y: 480, w: 560, h: 560 }, DEEP, "#a8b8a0", [1, 2.4])}`, "editorial-art");
}

/* Small leaf glyph for UI */
export const leafIcon = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 2c5 3 7 8 4 14-1.5 3-4 4-4 6 0-2-2.5-3-4-6-3-6-1-11 4-14z" fill="currentColor"/></svg>`;
