import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The site's one section opening: a numbered label on the left, the title
 * beneath it, and an optional link pushed to the far right of the same
 * baseline. Sections vary their *content* layout below this; the opening
 * never varies, which is most of what makes a page read as one document.
 *
 * The number is passed in rather than derived so the page's own order is
 * visible in the page file — a section that moves takes its number with it.
 */
export function SectionHeading({
  index,
  label,
  title,
  lead,
  link,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  link?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-6">
        <p className="label" data-reveal>
          <span className="text-slate-dim/60">{index}</span>
          {label}
        </p>

        {link && (
          <Link
            href={link.href}
            className="link-underline t-mono text-mist transition-colors duration-300 hover:text-chalk"
            data-reveal
          >
            {link.label}
          </Link>
        )}
      </div>

      <h2
        className="t-h2 mt-7 max-w-[20ch]"
        data-reveal
        style={{ ["--reveal-delay" as string]: "60ms" }}
      >
        {title}
      </h2>

      {lead && (
        <p
          className="t-lead mt-6 max-w-[52ch] text-mist"
          data-reveal
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
