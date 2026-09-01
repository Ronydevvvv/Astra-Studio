"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One observer for the whole page.
 *
 * Sections stay server components and simply carry `data-reveal`; this single
 * client island upgrades them, which is far cheaper than wrapping every
 * animated block in its own client component with its own observer.
 *
 * THREE THINGS KEEP IT FROM HIDING CONTENT — all learned the hard way:
 *
 *  1. `pathname` in the dependency list. With `[]` the effect ran once, so
 *     after a client-side navigation the NEW page's elements were never
 *     observed and stayed at opacity 0 — a blank page until manual refresh.
 *
 *  2. A MutationObserver, for nodes that arrive after the effect runs
 *     (streamed segments, anything mounted late).
 *
 *  3. A failsafe timer. An element that is never intersected — clipped by an
 *     ancestor, zero-height at observe time, observer starved on a background
 *     tab — would otherwise stay invisible forever. Hiding content is a far
 *     worse failure than skipping an animation, so after 2.5s everything
 *     still pending is simply shown.
 */
export function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const show = (el: Element) => el.classList.add("is-visible");
    const pending = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)")
      );

    if (reduced) {
      pending().forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          observer.unobserve(entry.target);
        }
      },
      /**
       * threshold 0, not 0.12. Requiring 12% of an element to be visible
       * means the last blocks on a page — the ones sitting inside the
       * negative bottom margin when the document is already scrolled as far
       * as it goes — can never satisfy it, and stay hidden permanently. The
       * margin alone is enough to delay the trigger until the element is
       * properly on screen.
       */
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    const observeAll = () => pending().forEach((el) => observer.observe(el));
    observeAll();

    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    const failsafe = window.setTimeout(() => pending().forEach(show), 2500);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
