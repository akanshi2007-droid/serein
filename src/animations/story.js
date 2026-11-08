// Scroll-driven storytelling for the SEREIN home page.
//
// Strategy
//  - Default CSS is a fully readable, static, stacked layout (works with no JS, no GSAP, reduced motion).
//  - When motion is allowed we add `.is-cinematic` (desktop) or `.is-lite` (mobile) to #story.
//  - Only 4 scenes are pinned on desktop (hero, ingredients, products, ritual). Brand + campaign use
//    CSS position: sticky; the rest scroll naturally. Nothing is pinned on mobile.
//  - Every tween is scrubbed, so scrolling up reverses it exactly.

import { $, $$, splitWords } from "../utils/dom.js";

const DESKTOP = "(min-width: 861px) and (prefers-reduced-motion: no-preference)";
const MOBILE = "(max-width: 860px) and (prefers-reduced-motion: no-preference)";
const SOFT = "none"; // scrubbed tweens use linear easing so the scrollbar is the playhead

export function initStory(root) {
  const story = $("#story", root);
  const { gsap, ScrollTrigger } = window;
  if (!story || !gsap || !ScrollTrigger) return null; // static layout still fully works

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  // split big statements into words (kept even in static mode, they just stay visible)
  $$("[data-split]", story).forEach((el) => splitWords(el));

  // "Discover the ritual" etc.
  const onClick = (e) => {
    const b = e.target.closest("[data-scroll]");
    if (!b) return;
    const trig = ScrollTrigger.getById(b.dataset.scroll);
    const target = $("#" + b.dataset.scroll, story);
    const y = trig ? trig.start : target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: "smooth" });
  };
  story.addEventListener("click", onClick);

  /* =============================  DESKTOP  ============================= */
  mm.add(DESKTOP, () => {
    story.classList.add("is-cinematic");
    document.body.classList.add("has-reveal-footer");
    const footer = document.getElementById("site-footer");
    const main = document.getElementById("main");
    const sizeFooter = () => { main.style.marginBottom = footer.offsetHeight + "px"; };
    sizeFooter();
    window.addEventListener("resize", sizeFooter);

    /* 1 — HERO: intro, then pinned while the brand section slides over it (takeover) */
    gsap.from(".hero__title .line__i", { yPercent: 110, duration: 1.4, ease: "power3.out", stagger: 0.14, delay: 0.15 });
    gsap.from([".hero__eyebrow", ".hero__lede", ".hero__cta", ".hero__scroll"], { y: 24, opacity: 0, duration: 1.2, ease: "power2.out", stagger: 0.12, delay: 0.7 });
    // intro targets the inner svg so it never fights the scrubbed tween on the wrapper
    gsap.from(".hero__product .art", { y: 80, opacity: 0, scale: 0.92, duration: 1.8, ease: "power3.out", delay: 0.2 });

    const heroTl = gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: { id: "hero", trigger: "#hero", start: "top top", end: "+=100%", pin: true, pinSpacing: false, scrub: 0.8 },
    });
    heroTl
      .to(".hero__inner", { scale: 0.92, opacity: 0, filter: "blur(12px)", yPercent: -8 }, 0)
      .to(".hero__product", { scale: 1.35, yPercent: -10 }, 0)
      .to(".hero__layer--back", { scale: 1.2 }, 0)
      .to(".hero__layer--mid", { scale: 1.12, yPercent: -4 }, 0)
      .to(".hero__layer--front", { scale: 1.25, yPercent: 6 }, 0)
      .to("#hero", { opacity: 0.35 }, 0.3);

    /* 2 — BRAND STORY: CSS sticky + scrubbed word reveal, ivory → sage */
    const words = $$("#brand-title .w__i", story);
    gsap.set(words, { opacity: 0.12, yPercent: 40 });
    gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: { trigger: "#brand", start: "top 20%", end: "bottom bottom", scrub: 0.7 },
    })
      .to(words, { opacity: 1, yPercent: 0, stagger: 0.08, duration: 0.6 }, 0)
      .to("#brand", { backgroundColor: "#a8b8a0" }, 0.1)
      .fromTo(".brand__facts li", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, ">-0.35")
      .to("#brand-title", { scale: 0.94 }, ">+0.2");

    /* 3 — INGREDIENTS: arch image expands into a full-screen botanical, sage → forest */
    const ingTl = gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: { id: "ingredients", trigger: "#ingredients", start: "top top", end: "+=190%", pin: true, scrub: 1 },
    });
    gsap.set(".ing__frame", { clipPath: "inset(16% 31% 14% 31% round 280px 280px 28px 28px)" });
    gsap.set(".ing__art", { scale: 1.45 });
    gsap.set(".ing__big, .ing__list li", { opacity: 0, y: 40 });
    ingTl
      .to("#ingredients", { backgroundColor: "#1e3a2c" }, 0)
      .to(".ing__frame", { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", duration: 1 }, 0)
      .to(".ing__art", { scale: 1, duration: 1.1 }, 0)
      .to(".ing__title-block", { opacity: 0, filter: "blur(10px)", x: -60, duration: 0.45 }, 0.1)
      .to(".ing__big", { opacity: 1, y: 0, duration: 0.4 }, 0.8)
      .to(".ing__list li", { opacity: 1, y: 0, stagger: 0.12, duration: 0.35 }, 0.95)
      .to(".ing__veil", { opacity: 1, duration: 0.3 }, 1.1)
      .to({}, { duration: 0.35 }); // breathing room at the end

    /* 4 — PRODUCTS: individual scenes take each other over, one after another */
    const scenes = $$(".pscene", story);
    const dots = $$(".prod__dots li", story);
    gsap.set(scenes.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(scenes.slice(1).map((s) => $(".pscene__art", s)), { scale: 0.78, yPercent: 14 });
    gsap.set(scenes.slice(1).map((s) => $(".pscene__text", s)), { opacity: 0, y: 40 });
    const prodTl = gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: {
        id: "products", trigger: "#products", start: "top top", end: `+=${(scenes.length - 1) * 110}%`, pin: true, scrub: 1,
        onUpdate: (self) => {
          const i = Math.round(self.progress * (scenes.length - 1));
          scenes.forEach((s, k) => s.classList.toggle("is-active", k === i));
          dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
        },
      },
    });
    scenes[0].classList.add("is-active"); dots[0]?.classList.add("is-on");
    scenes.forEach((s, i) => {
      if (i === 0) return;
      const prev = scenes[i - 1];
      const t = i - 1;
      prodTl
        .to(s, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, t)
        .to($(".pscene__art", prev), { scale: 1.14, yPercent: -10, duration: 1 }, t)
        .to($(".pscene__text", prev), { opacity: 0, y: -40, filter: "blur(6px)", duration: 0.6 }, t)
        .to($(".pscene__art", s), { scale: 1, yPercent: 0, duration: 1 }, t)
        .to($(".pscene__text", s), { opacity: 1, y: 0, duration: 0.6 }, t + 0.5);
    });
    prodTl.to({}, { duration: 0.3 });

    /* 5 — RITUAL: three chapters over one pinned stage (sticky storytelling) */
    const chapters = $$(".rchapter", story);
    const rail = $$(".ritual__rail li", story);
    gsap.set(chapters.slice(1), { opacity: 0, clipPath: "inset(0% 0% 0% 100%)" });
    chapters.forEach((c, i) => {
      gsap.set($(".rchapter__art", c), { scale: i === 0 ? 1 : 1.08 });
      if (i) gsap.set($(".rchapter__text", c), { y: 50, opacity: 0 });
    });
    const ritTl = gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: {
        id: "ritual", trigger: "#ritual", start: "top top", end: `+=${(chapters.length - 1) * 120}%`, pin: true, scrub: 1,
        onUpdate: (self) => {
          const i = Math.round(self.progress * (chapters.length - 1));
          chapters.forEach((c, k) => c.classList.toggle("is-active", k === i));
          rail.forEach((r, k) => r.classList.toggle("is-on", k === i));
        },
      },
    });
    chapters[0].classList.add("is-active"); rail[0]?.classList.add("is-on");
    chapters.forEach((c, i) => {
      if (i === 0) return;
      const prev = chapters[i - 1], t = i - 1;
      ritTl
        .to(c, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, t)
        .to($(".rchapter__art", prev), { scale: 0.94, duration: 1 }, t)
        .to($(".rchapter__text", prev), { opacity: 0, y: -40, duration: 0.5 }, t)
        .to($(".rchapter__art", c), { scale: 1, duration: 1 }, t)
        .to($(".rchapter__text", c), { opacity: 1, y: 0, duration: 0.5 }, t + 0.5)
        .to($(".rchapter__prod", c), { yPercent: -3, duration: 1 }, t);
    });
    ritTl.to({}, { duration: 0.25 });

    /* 6 — CAMPAIGN: clip-path reveal + oversized parallax text; sticky, not pinned */
    gsap.set(".camp__img", { clipPath: "inset(14% 14% 14% 14% round 36px)" });
    gsap.set(".camp__img .art", { scale: 1.25 });
    gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: { trigger: "#campaign", start: "top bottom", end: "bottom bottom", scrub: 1 },
    })
      .to(".camp__img", { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.28 }, 0)
      .to(".camp__img .art", { scale: 1, yPercent: -4, duration: 1 }, 0)
      .fromTo(".camp__row--a", { xPercent: 22 }, { xPercent: -14, duration: 1 }, 0)
      .fromTo(".camp__row--b", { xPercent: -26 }, { xPercent: 12, duration: 1 }, 0)
      .fromTo(".camp__cap", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.6);

    /* 7 — CLOSING: words reveal, then the panel lifts away to uncover the fixed footer */
    const cw = $$("#close-title .w__i", story);
    gsap.set(cw, { opacity: 0.1, yPercent: 40 });
    gsap.timeline({
      defaults: { ease: SOFT },
      scrollTrigger: { trigger: "#closing", start: "top 70%", end: "top 15%", scrub: 0.7 },
    })
      .to(cw, { opacity: 1, yPercent: 0, stagger: 0.12, duration: 0.6 }, 0)
      .fromTo(".closing__lede, .signup, .closing__inner > .btn", { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.4 }, 0.5);
    gsap.to(".closing__inner", {
      scale: 0.96, ease: SOFT,
      scrollTrigger: { trigger: "#closing", start: "bottom 90%", end: "bottom top", scrub: true },
    });

    ScrollTrigger.refresh();
    return () => {
      story.classList.remove("is-cinematic");
      document.body.classList.remove("has-reveal-footer");
      window.removeEventListener("resize", sizeFooter);
      main.style.marginBottom = "";
      scenes.forEach((s) => s.classList.remove("is-active"));
    };
  });

  /* =============================  MOBILE (natural scroll, nothing pinned)  ============================= */
  mm.add(MOBILE, () => {
    story.classList.add("is-lite");
    gsap.from(".hero__title .line__i", { yPercent: 110, duration: 1.2, ease: "power3.out", stagger: 0.12, delay: 0.1 });
    gsap.from([".hero__eyebrow", ".hero__lede", ".hero__cta"], { y: 20, opacity: 0, duration: 1, stagger: 0.1, delay: 0.5 });
    gsap.to(".hero__product", { yPercent: -8, scale: 1.08, ease: SOFT, scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__layer--front", { yPercent: 8, ease: SOFT, scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });

    // brand words (scrubbed, no sticky)
    const w = $$("#brand-title .w__i", story);
    gsap.set(w, { opacity: 0.15 });
    gsap.to(w, { opacity: 1, stagger: 0.08, ease: SOFT, scrollTrigger: { trigger: "#brand-title", start: "top 85%", end: "bottom 45%", scrub: true } });
    gsap.to("#brand", { backgroundColor: "#a8b8a0", ease: SOFT, scrollTrigger: { trigger: "#brand", start: "top 60%", end: "bottom 60%", scrub: true } });

    // ingredients frame expands as it enters
    gsap.fromTo(".ing__frame", { clipPath: "inset(6% 8% 6% 8% round 120px 120px 24px 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: SOFT, scrollTrigger: { trigger: ".ing__frame", start: "top 85%", end: "center 45%", scrub: true } });
    gsap.fromTo(".ing__art", { scale: 1.25 }, { scale: 1, ease: SOFT, scrollTrigger: { trigger: ".ing__frame", start: "top 90%", end: "bottom 30%", scrub: true } });

    // each product scene and ritual chapter softly rises + the art drifts
    $$(".pscene, .rchapter", story).forEach((s) => {
      gsap.from(s, { y: 40, opacity: 0, ease: "power2.out", duration: 0.9, scrollTrigger: { trigger: s, start: "top 85%", toggleActions: "play none none reverse" } });
      const art = $(".pscene__art, .rchapter__prod", s);
      gsap.fromTo(art, { yPercent: 6 }, { yPercent: -6, ease: SOFT, scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: true } });
    });

    // campaign
    gsap.fromTo(".camp__img", { clipPath: "inset(10% 8% 10% 8% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: SOFT, scrollTrigger: { trigger: "#campaign", start: "top 85%", end: "top 20%", scrub: true } });
    gsap.fromTo(".camp__row--a", { xPercent: 12 }, { xPercent: -8, ease: SOFT, scrollTrigger: { trigger: "#campaign", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.fromTo(".camp__row--b", { xPercent: -14 }, { xPercent: 6, ease: SOFT, scrollTrigger: { trigger: "#campaign", start: "top bottom", end: "bottom top", scrub: true } });

    const cw = $$("#close-title .w__i", story);
    gsap.set(cw, { opacity: 0.15 });
    gsap.to(cw, { opacity: 1, stagger: 0.1, ease: SOFT, scrollTrigger: { trigger: "#closing", start: "top 75%", end: "top 30%", scrub: true } });

    return () => story.classList.remove("is-lite");
  });

  // Reduced motion: nothing to animate; make sure split words are fully visible
  mm.add("(prefers-reduced-motion: reduce)", () => {
    $$(".w__i", story).forEach((w) => { w.style.opacity = 1; });
  });

  return () => {
    story.removeEventListener("click", onClick);
    mm.revert();
    document.body.classList.remove("has-reveal-footer");
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
