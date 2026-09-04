import { about } from "@/lib/content";
import { ScrollTrack } from "@/components/ui/ScrollTrack";
import { MouseParallax } from "@/components/ui/MouseParallax";

/**
 * The character illustration this section used to carry (an astronaut
 * holding a lit bulb) rendered poorly at scale — too visibly a keyed-out
 * photo, not a mark ASTRA drew. Rather than patch it further, the argument
 * itself ("a good idea isn't evident until it's built out") is now made with
 * the same geometry the rest of the site already speaks: a signal steadying
 * into a fixed point as the four steps are read, ringed by the orbit
 * vocabulary from the hero. No new asset, nothing borrowed from another
 * project — original, and impossible to render "buggy" since it's drawn,
 * not photographed.
 */
export function Approach({ heading = true }: { heading?: boolean }) {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden py-28 md:py-36 lg:py-44"
    >
      <div className="glow left-[-12%] top-[18%] size-[34rem] bg-violet-700/[0.14]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 xl:px-16">
        <ScrollTrack
          steps={about.blocks.length}
          className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center"
        >
          {/* --- signal, steadying into a point --- */}
          <MouseParallax
            className="relative lg:sticky lg:top-32"
            data-reveal
          >
            <div className="relative mx-auto aspect-square max-w-[380px] lg:max-w-none">
              {/* The light itself grows with reading progress through the
                  four steps (`--progress`, from the shared ScrollTrack
                  wrapper) — the idea becoming evident is something that
                  visibly happens, not a caption beside a static picture. */}
              <div
                className="glow left-1/2 top-1/2 size-[20rem] bg-violet-500/40 transition-[opacity,transform] duration-300"
                style={{
                  opacity: "calc(0.25 + var(--progress, 0) * 0.9)",
                  transform:
                    "translate(-50%, -50%) scale(calc(1 + var(--progress, 0) * 0.25))",
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  transform:
                    "translate3d(calc(var(--px,0) * -10px), calc(var(--py,0) * -8px), 0)",
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 100"
                  className="size-full opacity-70"
                >
                  <defs>
                    <linearGradient id="approach-orbit-grad">
                      <stop offset="0%" stopColor="#9a6bff" stopOpacity="0" />
                      <stop offset="50%" stopColor="#9a6bff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#9a6bff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="44"
                    ry="30"
                    fill="none"
                    stroke="url(#approach-orbit-grad)"
                    strokeWidth="0.3"
                    strokeDasharray="0.6 2.6"
                    className="animate-[spin_120s_linear_infinite]"
                    style={{ transformOrigin: "50% 50%" }}
                  />
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="30"
                    ry="42"
                    fill="none"
                    stroke="rgba(154,107,255,0.35)"
                    strokeWidth="0.25"
                    strokeDasharray="0.4 3"
                    className="animate-[spin_90s_linear_infinite_reverse]"
                    style={{ transformOrigin: "50% 50%" }}
                  />

                  {/* A coordinate ring — twelve short ticks, like a compass
                      or a targeting readout, not a full dial with numbers
                      (that would read as a UI mockup, not a mark). Static:
                      the two ellipses already carry the rotation, a third
                      spinning layer would blur into noise. */}
                  <g opacity="0.3" stroke="#9a6bff" strokeWidth="0.4">
                    {Array.from({ length: 12 }, (_, i) => {
                      const angle = (i / 12) * Math.PI * 2;
                      const x1 = 50 + Math.cos(angle) * 47;
                      const y1 = 50 + Math.sin(angle) * 47;
                      const x2 = 50 + Math.cos(angle) * 44;
                      const y2 = 50 + Math.sin(angle) * 44;
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                    })}
                  </g>

                  {/* A trajectory reaching one satellite — the constellation
                      is connected to something, not just floating dots. */}
                  <path
                    d="M50 50 L82 30"
                    stroke="rgba(154,107,255,0.4)"
                    strokeWidth="0.25"
                    strokeDasharray="0.4 1.6"
                  />

                  {/* Satellite nodes — the method's steps aren't literally
                      four, but the visual reads as "several things in orbit
                      around one idea", which is the point; it does not need
                      to count. */}
                  <circle cx="50" cy="8" r="1.4" fill="#c4b5fd" opacity="0.8" />
                  <circle cx="88" cy="58" r="1" fill="#9a6bff" opacity="0.6" />
                  <circle cx="14" cy="66" r="1.2" fill="#c4b5fd" opacity="0.7" />
                  <circle cx="82" cy="30" r="1.6" fill="#ede9fe" opacity="0.9" />

                  {/* Four corner brackets — a raw idea has no edges; a
                      built thing does. They're invisible at rest and draw
                      themselves in as reading progresses, so the centre
                      reads as resolving into something defined instead of
                      just glowing brighter. The same frame vocabulary the
                      hero's floating code window already uses, at its
                      quietest possible volume. */}
                  <g
                    stroke="#c4b5fd"
                    strokeWidth="0.35"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      opacity: "var(--progress, 0)",
                      transform: "scale(calc(0.85 + var(--progress, 0) * 0.15))",
                      transformOrigin: "50px 50px",
                      transition: "opacity 0.3s, transform 0.3s",
                    }}
                  >
                    <path d="M42 38h-4v4" />
                    <path d="M58 38h4v4" />
                    <path d="M42 62h-4v-4" />
                    <path d="M58 62h4v-4" />
                  </g>

                  {/* The fixed point at the centre — what the light is
                      converging on. Its own glow intensifies with the same
                      --progress driving the ambient glow behind it, so the
                      whole composition reads as one thing sharpening into
                      focus rather than two unrelated effects. */}
                  <circle
                    cx="50"
                    cy="50"
                    r="3.2"
                    fill="#ede9fe"
                    style={{
                      filter:
                        "drop-shadow(0 0 calc(4px + var(--progress, 0) * 10px) rgba(196,181,253,0.9))",
                    }}
                  />
                </svg>
              </div>
            </div>
          </MouseParallax>

          {/* --- editorial --- */}
          <div>
            {heading && (
              <div data-reveal>
                <p className="flex items-center gap-4 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-violet-300/90">
                  <span
                    aria-hidden="true"
                    className="h-px w-8 bg-violet-500/70"
                  />
                  {about.eyebrow}
                </p>
                <h2 className="mt-8 text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.038em]">
                  <span className="block">{about.title[0]}</span>
                  <span className="block text-mist">{about.title[1]}</span>
                </h2>
              </div>
            )}

            {heading && (
              <p
                className="mt-8 max-w-xl text-[1.0625rem] leading-[1.8] text-mist"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
              >
                {about.lead}
              </p>
            )}

            <div className={`relative ${heading ? "mt-14" : ""}`}>
              {/* Progress spine — the same device as the home Process
                  section, so both "here is how we work" moments in the site
                  share one visual grammar. Reads --progress from the
                  ScrollTrack wrapping the whole grid above. */}
              <span
                aria-hidden="true"
                className="absolute bottom-7 left-0 top-7 w-px overflow-hidden bg-white/[0.06]"
              >
                <span
                  className="block w-px origin-top bg-[linear-gradient(180deg,rgba(124,58,245,0.9),rgba(154,107,255,0.9))]"
                  style={{ height: "100%", transform: "scaleY(var(--progress, 0))" }}
                />
              </span>

              <ol>
                {about.blocks.map((block) => (
                  <li
                    key={block.title}
                    data-step
                    className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 border-t border-white/[0.09] py-7 pl-6 opacity-55 transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out-expo)] data-[active]:translate-x-1.5 data-[active]:opacity-100"
                  >
                    <span className="font-display text-[1.75rem] font-medium tracking-[-0.03em] text-white/15 transition-colors duration-500 group-hover:text-violet-300 group-data-[active]:text-violet-400">
                      {block.index}
                    </span>
                    <div>
                      <h3 className="text-[1.25rem] font-medium tracking-[-0.015em] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1">
                        {block.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-[0.9375rem] leading-[1.75] text-mist">
                        {block.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollTrack>
      </div>
    </section>
  );
}
