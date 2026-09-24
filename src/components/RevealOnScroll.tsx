"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const selector = ".reveal,.lines";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -7% 0px" }
    );

    const observe = (root: ParentNode) => {
      root.querySelectorAll(selector).forEach((element) => {
        if (!element.classList.contains("in")) io.observe(element);
      });
    };

    observe(document);

    // Server-rendered catalog updates add new cards after this component mounts.
    // Observe those cards too so a filter change cannot leave them hidden.
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(selector) && !node.classList.contains("in")) io.observe(node);
          observe(node);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
