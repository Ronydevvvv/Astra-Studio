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
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Logo />

          {/* The active item is marked by a dot before it rather than an
              underline sliding in violet — the nav should tell you where
              you are without becoming the brightest thing on screen. */}
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative font-display text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                        active ? "text-chalk" : "text-mist hover:text-chalk"
                      }`}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -left-3.5 top-1/2 size-[3px] -translate-y-1/2 rounded-full bg-chalk"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Responsive display sits on a wrapper: Button's base class sets
                `inline-flex`, so a `hidden` passed through className is a
                same-specificity display clash whose winner depends on
                Tailwind's output order. */}
            <div className="hidden md:block">
              <Button href={primaryCta.href} variant="line" className="px-5 py-3">
                {primaryCta.label}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              className="grid size-11 place-items-center border border-[var(--hairline-strong)] text-chalk transition-colors duration-300 hover:border-chalk lg:hidden"
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
        <div className="shell flex h-full flex-col pb-10 pt-[calc(var(--nav-h)+2rem)]">
          <nav aria-label="Navigation mobile">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-[var(--hairline)]">
                  <Link
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between gap-6 py-5"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 450ms ${100 + i * 45}ms, transform 500ms ${100 + i * 45}ms var(--ease-out-expo)`,
                    }}
                  >
                    <span
                      className={`font-display text-[1.625rem] font-medium tracking-[-0.03em] ${
                        isActive(item.href) ? "text-chalk" : "text-mist"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="t-mono text-slate-dim">
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
