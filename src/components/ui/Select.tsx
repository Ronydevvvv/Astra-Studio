"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * A listbox built to match the site's own field language (hairline
 * underline, violet focus, no rounded pill) instead of the browser's native
 * `<select>` popup, which is unstyleable and renders in the OS's own light
 * chrome — the one visibly un-ASTRA element on the page it appeared on.
 *
 * Submits through a hidden `<input type="hidden">` carrying the same
 * `name`, so `new FormData(form)` in ContactForm sees it exactly like a
 * native control — no special-casing needed at the call site.
 */
export function Select({
  id,
  name,
  options,
  placeholder,
  required,
}: {
  id: string;
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  /** Closes the list and always hands focus back to the trigger button —
   * without this, closing from the keyboard (select, Escape, Tab) drops
   * focus onto <body> the instant the listbox becomes `invisible`, since
   * that was the focused element. That silently breaks the rest of the
   * page's tab order for a keyboard user, who lands nowhere and has to
   * start tabbing over from the top. */
  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const select = (opt: string) => {
    setValue(opt);
    close();
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} required={required} />

      <button
        ref={buttonRef}
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => {
          setActiveIndex(Math.max(0, options.indexOf(value)));
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveIndex(Math.max(0, options.indexOf(value)));
            setOpen(true);
          }
        }}
        className="peer flex w-full items-center justify-between border-b border-white/[0.14] bg-transparent py-3.5 text-left text-[1rem] outline-none transition-colors duration-300 hover:border-white/25 focus:border-violet-400"
      >
        <span className={value ? "text-chalk" : "text-slate-dim"}>
          {value || placeholder}
        </span>
        <Icon
          name="arrow"
          className={`size-3.5 shrink-0 rotate-90 text-slate-dim transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] ${
            open ? "-scale-y-100" : ""
          }`}
        />
      </button>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-violet-400 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] peer-focus:scale-x-100"
      />

      <ul
        ref={listRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={id}
        aria-activedescendant={open ? `${listboxId}-${activeIndex}` : undefined}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(options.length - 1, i + 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(0, i - 1));
          } else if (e.key === "Home") {
            e.preventDefault();
            setActiveIndex(0);
          } else if (e.key === "End") {
            e.preventDefault();
            setActiveIndex(options.length - 1);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(options[activeIndex]);
          } else if (e.key === "Escape") {
            e.preventDefault();
            close();
          } else if (e.key === "Tab") {
            setOpen(false);
          }
        }}
        className={`absolute inset-x-0 top-full z-20 mt-2 max-h-64 overflow-auto rounded-md border border-white/10 bg-[#0b0e22] py-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] outline-none transition-[opacity,transform] duration-200 [transition-timing-function:var(--ease-out-expo)] ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {options.map((opt, i) => (
          <li
            key={opt}
            id={`${listboxId}-${i}`}
            role="option"
            aria-selected={opt === value}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => select(opt)}
            className={`cursor-pointer px-4 py-2.5 text-[0.9375rem] transition-colors duration-150 ${
              i === activeIndex ? "bg-violet-500/15 text-chalk" : "text-mist"
            } ${opt === value ? "text-violet-300" : ""}`}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}
