"use client";

import { useEffect } from "react";
import { scrollStore } from "@/lib/scrollStore";

const THEMES = ["light", "dark", "light", "dark", "light", "dark", "signal"];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Converts window scroll into a float section index for the 3D scene,
 * tracks the pointer, and switches the page theme per section.
 */
export function useScrollDriver(ids: readonly string[]) {
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    let tops: number[] = [];

    const measure = () => {
      tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
    };

    const update = () => {
      if (tops.length === 0) return;
      const y = window.scrollY + window.innerHeight * 0.5;
      let i = 0;
      for (let k = 0; k < tops.length; k++) if (y >= tops[k]) i = k;
      const start = tops[i];
      const end = i + 1 < tops.length ? tops[i + 1] : document.documentElement.scrollHeight;
      const frac = clamp((y - start) / Math.max(1, end - start), 0, 1);
      // Hold on each object for the first half of a section, then travel to the next.
      scrollStore.section = i + (i + 1 < tops.length ? smoothstep(0.5, 1, frac) : 0);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollStore.progress = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
      const theme = THEMES[i] ?? "light";
      if (document.body.dataset.theme !== theme) document.body.dataset.theme = theme;
    };

    const onPointer = (e: PointerEvent) => {
      scrollStore.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollStore.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    scrollStore.calm = mq.matches;

    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    // Layout can shift after fonts load.
    const t = window.setTimeout(onResize, 600);
    window.addEventListener("load", onResize);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("load", onResize);
    };
  }, [ids]);
}
