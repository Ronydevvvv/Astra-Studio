import Link from "next/link";

/**
 * ASTRA / STUDIO.
 *
 * The mark is a five-point star drawn as an outline with a solid core, which
 * is what lets it stay legible at 28px while still reading as a *drawn* mark
 * rather than a filled blob. Its geometry echoes the star on the astronaut's
 * shoulder, so the wordmark and the 3D characters belong to one identity.
 */
export function Logo({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="#accueil"
      aria-label="ASTRA Studio — retour en haut"
      className={`group/logo flex items-center gap-3.5 ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className={`shrink-0 text-violet-500 transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover/logo:rotate-[72deg] ${
          compact ? "size-8" : "size-9 md:size-11"
        }`}
        aria-hidden="true"
      >
        <path
          d="M24 3.2 30.1 17.9 45.8 19.2 33.9 29.6 37.5 45 24 36.8 10.5 45l3.6-15.4L2.2 19.2l15.7-1.3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path
          d="M24 15.4 27 22.6 34.7 23.2 28.9 28.3 30.6 35.8 24 31.8 17.4 35.8l1.7-7.5-5.8-5.1 7.7-.6Z"
          fill="currentColor"
          opacity="0.9"
        />
      </svg>

      <span className="leading-none">
        <span
          className={`block font-display font-semibold tracking-[0.02em] ${
            compact ? "text-[1.125rem]" : "text-[1.25rem] md:text-[1.5rem]"
          }`}
        >
          ASTRA
        </span>
        <span
          className={`mt-1 block font-display font-normal text-mist ${
            compact
              ? "text-[0.5625rem] tracking-[0.42em]"
              : "text-[0.625rem] tracking-[0.46em] md:text-[0.6875rem]"
          }`}
        >
          STUDIO
        </span>
      </span>
    </Link>
  );
}
