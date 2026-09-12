"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moves its child a fixed number of pixels across the whole time it is
 * on screen — the hero image drifts up as the page scrolls past it, so
 * the type and the image separate slightly in depth.
 *
 * Deliberately small: `distance` is measured in pixels, not in a
 * multiplier of scroll, which is what stops this becoming the parallax
 * that throws a layout apart at 4K. 40px is the whole effect.
 *
 * Writes a transform on a rAF-throttled scroll listener — no state, so
 * no re-render — and does nothing at all under reduced motion.
 */
export function ScrollShift({
  children,
  distance = 40,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!vh) return;
      // 0 when the element's top sits at the bottom of the viewport,
      // 1 once its bottom has passed the top — clamped, so the transform
      // is stable before and after the pass.
      const progress = Math.min(
        1,
        Math.max(0, (vh - r.top) / (vh + r.height))
      );
      el.style.transform = `translate3d(0, ${(-progress * distance).toFixed(2)}px, 0)`;
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
  }, [distance]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
