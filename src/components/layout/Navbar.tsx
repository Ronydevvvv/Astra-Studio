"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, primaryCta } from "@/lib/content";
import { Logo } from "./Logo";

/**
 * A header that is meant to be forgotten while you read.
 *
 * It is transparent at the top of the page and only acquires a ground and
 * a hairline once you scroll past the fold — so on arrival there is
 * nothing between the viewer and the headline.
 *
 * The active item is marked by a small violet dot before the label. That
 * dot is one of the two or three places the accent appears on a page; a
 * filled pill or a thick underline would make the navigation the
 * brightest thing on screen, which is backwards.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A route change must close the menu — without this a tap navigates
     behind an overlay that is still covering the page. */
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ${
          scrolled
            ? "border-b border-[var(--hairline)] bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-8">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative font-display text-[0.75rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
                        active ? "text-chalk" : "text-dim hover:text-chalk"
                      }`}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-3.5 top-1/2 size-[4px] -translate-y-1/2 rounded-full bg-signal"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={primaryCta.href}
              className="underline-draw hidden font-display text-[0.75rem] uppercase tracking-[0.16em] text-chalk md:inline-block"
            >
              {primaryCta.label}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="-mr-2 grid size-10 place-items-center text-chalk lg:hidden"
            >
              <span className="relative block h-2.5 w-6">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "top-1 -rotate-45" : "top-2.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu. `invisible` rather than unmounted so it can
          animate out and stays out of the tab order while closed. */}
      <div
        id="menu-mobile"
        ref={panelRef}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-void transition-[opacity,visibility] duration-700 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col pb-12 pt-[calc(var(--nav-h)+3rem)]">
          <nav aria-label="Navigation mobile">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-6 border-b border-[var(--hairline)] py-6"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(14px)",
                      transition: `opacity 600ms ${120 + i * 60}ms, transform 700ms ${120 + i * 60}ms var(--ease-out-expo)`,
                    }}
                  >
                    <span
                      className={`font-display text-[clamp(1.75rem,7vw,2.5rem)] tracking-[-0.035em] ${
                        isActive(item.href) ? "text-chalk" : "text-mist"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="eyebrow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={primaryCta.href}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-between gap-6 border-b border-[var(--hairline-strong)] pb-4 pt-12"
          >
            <span className="font-display text-[1.25rem] tracking-[-0.02em]">
              {primaryCta.label}
            </span>
            <svg
              viewBox="0 0 22 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
              className="h-3 w-5 shrink-0"
            >
              <path d="M0 6h20M15 1l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
