"use client";

import { useEffect, useRef, useCallback } from "react";

const SLIDES = [
  "/assets/Images/3.1.jpg",
  "/assets/Images/1.2.jpg",
  "/assets/Images/Nuts/Cheesy Cashew/2313 front shot.jpg",
  "/assets/Images/Nuts/Nutri Blend HM/9374.jpg",
  "/assets/Images/Puff/Chick Pea/Lime & Sriracha/front pack option2.jpg",
];

const LINES: [string, string][] = [
  ["Premium Snacks", "That Wow"],
  ["Corporate Gifting", "Made Easy"],
  ["Festive Hampers", "For Everyone"],
  ["Wedding Welcome", "Kits & More"],
  ["Chakna Boxes", "Party Ready"],
  ["Healthy Indulgences", "Guilt Free"],
  ["Artisanal Crunch", "In Every Bite"],
  ["Thoughtfully Curated", "Just For You"],
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tARef = useRef<HTMLDivElement>(null);
  const tBRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const slideIdxRef = useRef(0);
  const lineIdxRef = useRef(0);

  const swapText = useCallback(() => {
    const tA = tARef.current;
    const tB = tBRef.current;
    if (!tA || !tB) return;
    tA.classList.add("fade-out");
    tB.classList.add("fade-out");
    const handler = () => {
      tA.removeEventListener("animationend", handler);
      lineIdxRef.current = (lineIdxRef.current + 1) % LINES.length;
      tA.textContent = LINES[lineIdxRef.current][0];
      tB.textContent = LINES[lineIdxRef.current][1];
      tA.classList.remove("fade-out");
      tB.classList.remove("fade-out");
      void tA.offsetWidth;
      tA.classList.add("fade-text");
      tB.classList.add("fade-text");
      const h2 = () => {
        tA.removeEventListener("animationend", h2);
        tA.classList.remove("fade-text");
        tB.classList.remove("fade-text");
      };
      tA.addEventListener("animationend", h2);
    };
    tA.addEventListener("animationend", handler);
  }, []);

  // Scroll expansion
  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const media = mediaRef.current;
    const overlay = overlayRef.current;
    const tA = tARef.current;
    const tB = tBRef.current;
    const hint = hintRef.current;
    if (!hero || !media) return;

    let ticking = false;
    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

    const update = () => {
      const mob = window.innerWidth < 768;
      const range = hero.offsetHeight - window.innerHeight;
      const p = clamp((window.scrollY - hero.offsetTop) / (range || 1));
      const e = 1 - Math.pow(1 - p, 2);
      media.style.width = (300 + e * (mob ? window.innerWidth - 40 - 300 : Math.min(window.innerWidth, 1480) - 300)) + "px";
      media.style.height = (400 + e * (mob ? 260 : window.innerHeight - 400)) + "px";
      if (bg) bg.style.opacity = (1 - p * 1.1).toFixed(3);
      if (overlay) overlay.style.opacity = Math.max(0, 0.42 - p * 0.42).toFixed(3);
      const tx = p * (mob ? 14 : 11);
      const tOp = clamp(1 - p * 1.6);
      if (tA) {
        tA.style.transform = `translateX(-${tx}vw)`;
        tA.style.opacity = tOp.toFixed(3);
      }
      if (tB) {
        tB.style.transform = `translateX(${tx}vw)`;
        tB.style.opacity = tOp.toFixed(3);
      }
      if (hint) hint.style.opacity = Math.max(0, 1 - p * 2.4).toFixed(3);
      ticking = false;
    };

    const onS = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onS, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onS);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Slider + synced text
  useEffect(() => {
    const slideEls = heroRef.current?.querySelectorAll(".sh-slide");
    if (!slideEls || slideEls.length < 2) return;

    const interval = setInterval(() => {
      slideEls[slideIdxRef.current].classList.remove("on");
      slideIdxRef.current = (slideIdxRef.current + 1) % slideEls.length;
      slideEls[slideIdxRef.current].classList.add("on");
      if (slideIdxRef.current === 0) swapText();
    }, 3200);

    return () => clearInterval(interval);
  }, [swapText]);

  return (
    <section className="scroll-hero" id="top" ref={heroRef}>
      <div className="sh-sticky">
        <div className="sh-bg" ref={bgRef}>
          <div className="sh-bg-art" />
        </div>
        <div className="sh-media" ref={mediaRef}>
          <div className="sh-slider">
            {SLIDES.map((src, i) => (
              <div
                key={i}
                className={`sh-slide shg${i + 1} ${i === 0 ? "on" : ""}`}
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </div>
          <div className="sh-overlay" ref={overlayRef} />
        </div>
        <div className="sh-title">
          <div className="sh-text" ref={tARef}>Premium Snacks</div>
          <div className="sh-text" ref={tBRef}>That Wow</div>
        </div>
        <div className="sh-hint" ref={hintRef}>
          <div className="mouse" />
          <p>Scroll to expand</p>
        </div>
      </div>
    </section>
  );
}
