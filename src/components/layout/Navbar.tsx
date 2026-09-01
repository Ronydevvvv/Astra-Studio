"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, primaryCta } from "@/lib/content";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Opaque past the fold so the bar stays readable over any section. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Route change closes the menu — without this a tap navigates behind an
     overlay that is still covering the page. */
  useEffect(() => setOpen(false), [pathname]);

  /* Escape closes; body scroll is locked while the overlay is up. */
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-white/[0.07] bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[var(--nav-h)] max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10 xl:px-16">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative px-3.5 py-2 text-[0.75rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
                        active ? "text-chalk" : "text-mist hover:text-chalk"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-3.5 bottom-0 h-px origin-center bg-violet-400 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {/* Responsive display sits on a wrapper: Button's base class sets
                `inline-flex`, so a `hidden` passed through className is a
                same-specificity display clash whose winner depends on
                Tailwind's output order. */}
            <div className="hidden md:block">
              <Button href={primaryCta.href} variant="quiet" withArrow>
                {primaryCta.label}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid size-11 place-items-center rounded-full border border-white/15 text-chalk transition-colors duration-300 hover:border-white/30 lg:hidden"
            >
              <span className="relative block h-3 w-4.5">
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-full bg-current transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu. `invisible` rather than unmounted so the panel can
          animate out and stays out of the tab order while closed. */}
      <div
        id="menu-mobile"
        ref={panelRef}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-void transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-[calc(var(--nav-h)+2.5rem)]">
          <nav aria-label="Navigation mobile">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-white/[0.07]">
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5 font-display text-[1.75rem] font-medium tracking-[-0.03em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(12px)",
                      transition: `opacity 500ms ${120 + i * 55}ms, transform 600ms ${120 + i * 55}ms var(--ease-out-expo)`,
                    }}
                  >
                    <span
                      className={
                        isActive(item.href) ? "text-violet-300" : "text-chalk"
                      }
                    >
                      {item.label}
                    </span>
                    <span className="font-display text-[0.6875rem] tracking-[0.2em] text-slate-dim">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-10">
            <Button
              href={primaryCta.href}
              withArrow
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {primaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
