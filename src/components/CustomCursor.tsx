"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const outRef = useRef<HTMLDivElement>(null);
  const inRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.classList.add("cursor-on");
    const out = outRef.current;
    const inn = inRef.current;
    if (!out || !inn) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let ox = mx, oy = my, ix = mx, iy = my;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const ring = () => {
      ox += (mx - ox) * 0.16;
      oy += (my - oy) * 0.16;
      ix += (mx - ix) * 0.45;
      iy += (my - iy) * 0.45;
      out.style.transform = `translate(${ox}px,${oy}px) translate(-50%,-50%)`;
      inn.style.transform = `translate(${ix}px,${iy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(ring);
    };
    raf = requestAnimationFrame(ring);

    const onMouseOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(".pcard,a,button,.cat,.mcard,.pill");
      out.classList.remove("is-link", "is-view");
      if (!t) return;
      if (t.classList.contains("pcard") || t.classList.contains("mcard")) out.classList.add("is-view");
      else out.classList.add("is-link");
    };
    document.addEventListener("mouseover", onMouseOver);

    const onDown = () => out.classList.add("is-down");
    const onUp = () => out.classList.remove("is-down");
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div className="cur cur-out" ref={outRef}><span className="cur-label">View</span></div>
      <div className="cur cur-in" ref={inRef} />
    </>
  );
}
