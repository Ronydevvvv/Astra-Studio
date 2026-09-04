"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Ties a progress line and a set of step markers to actual scroll position,
 * rather than a one-shot "enter viewport" reveal.
 *
 * Publishes `--progress` (0..1, how far the wrapper has travelled through the
 * viewport) on the wrapper itself, and stamps `data-active` on every child
 * carrying `data-step` once the scroll has reached that step's share of the
 * wrapper. Both are plain DOM writes on a rAF-throttled scroll listener — no
 * re-renders, so a four- or six-step track costs the same one listener.
 */
export function ScrollTrack({
  children,
  className = "",
  steps,
}: {
  children: ReactNode;
  className?: string;
  steps: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--progress", "1");
      el.querySelectorAll("[data-step]").forEach((n) =>
        n.setAttribute("data-active", "true")
      );
      return;
    }

    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!vh) return;
      // 0 when the wrapper's top reaches 80% down the viewport (about to
      // enter), 1 when its bottom reaches 42% down. Finishing higher up
      // (rather than 60%) means the last step is fully lit while it is
      // still comfortably centered on screen, instead of activating right
      // as the user arrives on it — which read as "the last step is dark
      // and unreadable by the time you get there."
      const start = vh * 0.8;
      const end = vh * 0.42;
      const span = r.height + (start - end);
      const progress = Math.min(1, Math.max(0, (start - r.top) / span));

      el.style.setProperty("--progress", progress.toFixed(4));

      const activeCount = Math.round(progress * steps);
      nodes.forEach((n, i) => {
        if (i < activeCount) n.setAttribute("data-active", "true");
        else n.removeAttribute("data-active");
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [steps]);

  return (
    <div ref={ref} className={className} style={{ ["--progress" as string]: 0 }}>
      {children}
    </div>
  );
}
