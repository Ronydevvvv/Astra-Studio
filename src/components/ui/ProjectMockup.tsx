import { Icon } from "./Icon";

/**
 * Stand-in for a project screenshot that has not been supplied yet.
 *
 * This is deliberately NOT a fake screenshot: it never claims to show the
 * real interface, so it cannot misrepresent work that was never captured.
 * It draws a browser chrome + a device frame around an abstract composition
 * built only from the project's own name and category — real data, laid out
 * the way a case study cover would be, so the slot reads as "case study in
 * progress" rather than "content missing".
 *
 * The moment a real screenshot exists, `project.image` takes over and this
 * component is never rendered for that project again.
 */
export function ProjectMockup({
  name,
  category,
  variant = "default",
  live = false,
}: {
  name: string;
  category: string;
  /** "hero" gets a bigger glow and an orbital ring behind it, matching the
   * weight the site's own hero carries — a case-study cover shouldn't look
   * thinner than the index row that links to it. */
  variant?: "default" | "hero";
  /** True only for a project whose real status is "delivered" — a small
   * pulsing dot stating the site is live, never a fabricated metric. */
  live?: boolean;
}) {
  const monogram = name.trim().charAt(0).toUpperCase();
  const isHero = variant === "hero";

  return (
    <div className="group/mock relative aspect-[4/3] w-full">
      {/* ambient light behind the whole composition */}
      <div
        className={`glow left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet-600/[0.14] opacity-70 transition-opacity duration-700 group-hover:opacity-100 ${
          isHero ? "size-[110%]" : "size-[80%]"
        }`}
      />

      {isHero && (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 opacity-30 sm:size-[130%]"
        >
          <ellipse
            cx="50"
            cy="50"
            rx="47"
            ry="33"
            fill="none"
            stroke="rgba(154,107,255,0.7)"
            strokeWidth="0.25"
            strokeDasharray="0.6 2.6"
            className="animate-[spin_120s_linear_infinite]"
            style={{ transformOrigin: "50% 50%" }}
          />
        </svg>
      )}

      {live && (
        <span className="absolute -top-3 left-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#0b0e22]/90 px-3 py-1.5 text-[0.625rem] uppercase tracking-[0.14em] text-mist backdrop-blur-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          En ligne
        </span>
      )}

      {/* --- browser frame --- */}
      <div
        className={`relative h-full w-full overflow-hidden rounded-md border border-white/[0.09] bg-[#0b0e22] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1 ${
          isHero
            ? "shadow-[0_50px_120px_-40px_rgba(124,58,245,0.35)]"
            : "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
        }`}
        style={{
          transform:
            "rotate3d(calc(var(--py,0) * -1), var(--px,0), 0, 3deg)",
        }}
      >
        {/* chrome bar */}
        <div className="flex items-center gap-4 border-b border-white/[0.07] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
          </div>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5">
            <Icon name="search" className="size-3 shrink-0 text-slate-dim" />
            <span className="truncate text-[0.6875rem] tracking-[0.02em] text-slate-dim">
              {category.toLowerCase()}
            </span>
          </div>
        </div>

        {/* abstract page skeleton — real data (name/category), no invented UI */}
        <div className="relative flex h-full flex-col gap-3 p-5">
          <div className="flex items-center justify-between">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 to-violet-700 font-display text-[0.6875rem] font-medium text-white">
              {monogram}
            </span>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-8 rounded-full bg-white/[0.08]" />
              <span className="h-1.5 w-8 rounded-full bg-white/[0.08]" />
              <span className="h-1.5 w-10 rounded-full bg-violet-500/40" />
            </div>
          </div>

          <div className="mt-2 h-3 w-3/5 rounded-full bg-white/[0.14]" />
          <div className="h-2 w-2/5 rounded-full bg-white/[0.07]" />

          <div className="mt-2 grid flex-1 grid-cols-3 gap-2.5">
            <span className="col-span-2 rounded-sm bg-gradient-to-br from-violet-500/25 via-violet-700/10 to-transparent" />
            <span className="rounded-sm bg-white/[0.05]" />
          </div>

          {/* shimmer sweep — the one motion cue, reads as "alive" not "loading" */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-[1.4s] [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-full"
          />
        </div>
      </div>

      {/* --- phone frame, overlapping bottom-right --- */}
      <div
        className="absolute -bottom-6 -right-4 h-[64%] w-[34%] overflow-hidden rounded-[0.9rem] border border-white/[0.12] bg-[#0b0e22] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-2 group-hover:translate-x-1"
      >
        <div className="flex h-full flex-col gap-2 p-2.5">
          <div className="flex items-center justify-between">
            <span className="size-3 rounded-full bg-gradient-to-br from-violet-400 to-violet-700" />
            <span className="h-1 w-4 rounded-full bg-white/[0.1]" />
          </div>
          <div className="h-2 w-4/5 rounded-full bg-white/[0.12]" />
          <div className="mt-1 flex-1 rounded-sm bg-gradient-to-b from-violet-500/20 to-transparent" />
          <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
          <div className="h-1.5 w-2/3 rounded-full bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}
