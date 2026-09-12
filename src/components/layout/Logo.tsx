import Link from "next/link";

/**
 * ASTRA / STUDIO.
 *
 * The mark is a five-point star drawn as an outline — its geometry echoes
 * the star on the astronaut's shoulder, so the wordmark and the 3D figures
 * belong to one identity.
 *
 * Two changes from the previous version. It is no longer violet: a logo
 * that is the only coloured thing in the header is the header's loudest
 * element, which is backwards. And it no longer rotates 72° on hover — a
 * mark that spins when you approach it is a widget, not an identity.
 *
 * `href` is "/" rather than "#accueil": that anchor only exists on the
 * homepage, so on /services the logo used to be a link that went nowhere.
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
      href="/"
      aria-label="ASTRA Studio — accueil"
      className={`group/logo flex items-center gap-3.5 ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className={`shrink-0 text-chalk ${compact ? "size-7" : "size-8"}`}
        aria-hidden="true"
      >
        <path
          d="M24 3.2 30.1 17.9 45.8 19.2 33.9 29.6 37.5 45 24 36.8 10.5 45l3.6-15.4L2.2 19.2l15.7-1.3Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>

      <span className="leading-none">
        <span
          className={`block font-display font-semibold tracking-[0.01em] ${
            compact ? "text-[1.0625rem]" : "text-[1.1875rem]"
          }`}
        >
          ASTRA
        </span>
        <span
          className={`mt-[3px] block font-display font-normal text-slate-dim ${
            compact
              ? "text-[0.5rem] tracking-[0.4em]"
              : "text-[0.5625rem] tracking-[0.44em]"
          }`}
        >
          STUDIO
        </span>
      </span>
    </Link>
  );
}
