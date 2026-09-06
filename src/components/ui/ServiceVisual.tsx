import type { IconName } from "@/lib/content";

/**
 * A small, distinct scene per service — the six cards should not read as one
 * template repeated six times with a different icon swapped in. Each visual
 * borrows the vocabulary of its own discipline (a palette for design, a
 * terminal for code, a speed graph for performance…) rather than a shared
 * abstract shape, and animates only on the parent card's hover (`group-hover`)
 * so the grid stays quiet until someone actually looks at one.
 */
export function ServiceVisual({ icon }: { icon: IconName }) {
  switch (icon) {
    case "design":
      return (
        <div className="relative flex h-16 items-end justify-between gap-3" aria-hidden="true">
          {/* Faint layout grid behind everything — design work starts as a
              grid before it becomes a palette or a typeface choice. */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-4 gap-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="border-x border-dashed border-white/[0.06]" />
            ))}
          </div>

          {/* Palette — the same three swatches, but now sitting on the grid
              instead of floating alone. */}
          <div className="relative flex items-end gap-2">
            {["#7c3af5", "#c4b5fd", "#3d2a78"].map((c, i) => (
              <span
                key={c}
                className="block w-5 rounded-sm transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1"
                style={{
                  height: `${24 + i * 8}px`,
                  background: c,
                  transitionDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>

          {/* Type scale — two weights of the same mark, the other half of
              a design system alongside colour. */}
          <div className="relative flex items-baseline gap-1.5 pb-0.5 font-display">
            <span className="text-[1.75rem] font-medium leading-none text-chalk/90 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1">
              Aa
            </span>
            <span className="text-[0.8125rem] font-medium leading-none text-slate-dim transition-transform delay-75 duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1">
              Aa
            </span>
          </div>
        </div>
      );

    case "code":
      return (
        <div
          className="h-16 overflow-hidden rounded-sm border border-white/10 bg-white/[0.03] font-mono text-[0.625rem] leading-[1.7] text-violet-300/80"
          aria-hidden="true"
        >
          {/* Component tabs — a real editor has more than one file open;
              this is what actually separates "code" from "a code look". */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] px-3 py-1.5 text-[0.5625rem] text-slate-dim">
            <span className="text-violet-300">Hero.tsx</span>
            <span className="opacity-50">Nav.tsx</span>
          </div>
          <div className="flex gap-2 px-3 py-1.5">
            <span className="select-none text-white/15">
              1<br />2<br />3
            </span>
            <span>
              <span className="block w-0 overflow-hidden whitespace-nowrap text-mist/80 transition-[width] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:w-full">
                {"<Hero"}
              </span>
              <span className="block w-0 overflow-hidden whitespace-nowrap text-white/40 transition-[width] delay-100 duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:w-full">
                &nbsp;&nbsp;responsive
              </span>
              <span className="flex items-center whitespace-nowrap">
                <span className="inline-block w-0 overflow-hidden transition-[width] duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:w-[3ch] [transition-delay:200ms]">
                  {"/>"}
                </span>
                <span className="ml-px inline-block h-3 w-[2px] animate-pulse bg-violet-400" />
              </span>
            </span>
          </div>
        </div>
      );

    case "gauge":
      return (
        <svg viewBox="0 0 100 40" className="h-16 w-full" aria-hidden="true">
          {/* A faint grid — reads as a real measurement, not just a
              decorative squiggle. */}
          <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.5">
            <line x1="0" y1="10" x2="100" y2="10" />
            <line x1="0" y1="22" x2="100" y2="22" />
            <line x1="0" y1="34" x2="100" y2="34" />
          </g>
          {/* The "before" line — flatter, unoptimized, fading out to let the
              real one take over. Narrates "optimization happened" instead
              of just showing one confident curve. */}
          <polyline
            points="0,24 18,27 34,23 50,29 66,25 82,28 100,24"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.5 2.5"
          />
          <polyline
            points="0,32 18,26 34,30 50,14 66,20 82,6 100,10"
            fill="none"
            stroke="rgba(124,58,245,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset="1"
            className="transition-[stroke-dashoffset] duration-[1.1s] [transition-timing-function:var(--ease-out-expo)] group-hover:[stroke-dashoffset:0]"
          />
          <circle cx="100" cy="10" r="2.6" fill="#c4b5fd" />
        </svg>
      );

    case "devices":
      return (
        <div className="relative flex h-16 items-end gap-3" aria-hidden="true">
          {/* A single baseline linking the three screens — one layout
              adapting across sizes, not three unrelated boxes. */}
          <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-violet-500/40 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100" />
          <span className="relative h-16 w-10 rounded-[3px] border border-white/15 bg-white/[0.03] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1">
            <span className="absolute inset-x-1.5 top-2 h-px bg-white/15" />
            <span className="absolute inset-x-1.5 top-4 h-px w-2/3 bg-white/10" />
          </span>
          <span className="relative h-12 w-9 rounded-[3px] border border-white/15 bg-white/[0.03] transition-transform delay-75 duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1">
            <span className="absolute inset-x-1.5 top-2 h-px bg-white/15" />
          </span>
          <span className="relative h-8 w-4 rounded-[2px] border border-white/15 bg-white/[0.03] transition-transform delay-150 duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1">
            <span className="absolute inset-x-1 top-1.5 h-px bg-white/15" />
          </span>
        </div>
      );

    case "search":
      return (
        <div className="flex h-16 flex-col justify-center gap-2 font-mono text-[0.625rem]" aria-hidden="true">
          {[
            { tag: "<h1>", w: "w-3/5" },
            { tag: "<meta>", w: "w-4/5" },
            { tag: "<link>", w: "w-2/5" },
          ].map((row, i) => (
            <div key={row.tag} className="flex items-center gap-2.5">
              <span className="shrink-0 text-violet-400/70">{row.tag}</span>
              <span
                className={`h-1 origin-left scale-x-0 rounded-full bg-white/10 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100 ${row.w}`}
                style={{ transitionDelay: `${i * 90}ms` }}
              />
              <span
                className="ml-auto opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ transitionDelay: `${i * 90 + 250}ms` }}
              >
                <svg viewBox="0 0 16 16" className="size-3 text-emerald-400">
                  <path
                    d="M3 8.5 6.5 12 13 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      );

    case "support":
      return (
        <div className="flex h-16 items-center gap-0" aria-hidden="true">
          {/* Launch marker — a filled node distinct from the ones after it,
              so the row reads as "site goes live, then the relationship
              continues" rather than four interchangeable beads. */}
          <span className="relative flex size-3 shrink-0 items-center justify-center rounded-full border border-violet-400 bg-violet-500/20 transition-transform duration-500 group-hover:scale-110">
            <span className="size-1 rounded-full bg-violet-300" />
          </span>
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center">
              <span
                className="h-px w-6 origin-left scale-x-0 bg-violet-500/40 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                style={{ transitionDelay: `${i * 100 + 60}ms` }}
              />
              <span
                className="size-1.5 shrink-0 rounded-full bg-violet-400/60 transition-transform duration-500 group-hover:scale-125"
                style={{ transitionDelay: `${i * 100 + 100}ms` }}
              />
            </span>
          ))}
          {/* The line keeps going and fades — the relationship doesn't
              have a fixed end date. */}
          <span
            aria-hidden="true"
            className="h-px w-8 origin-left scale-x-0 bg-gradient-to-r from-violet-500/40 to-transparent transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
            style={{ transitionDelay: "420ms" }}
          />
        </div>
      );

    default:
      return null;
  }
}
