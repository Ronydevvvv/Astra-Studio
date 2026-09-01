import type { ReactNode } from "react";

/**
 * The site's one shared heading rhythm: eyebrow, display title, optional lead.
 * Sections vary their *layout*, never this internal spacing — that consistency
 * is most of what makes a page read as designed rather than assembled.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      <p
        className={`eyebrow ${centered ? "justify-center" : ""}`}
        data-reveal
      >
        {eyebrow}
      </p>

      <h2
        className="mt-6 text-[clamp(2rem,4.6vw,3.5rem)] font-medium leading-[1.06]"
        data-reveal
        style={{ ["--reveal-delay" as string]: "70ms" }}
      >
        {title}
      </h2>

      {lead && (
        <p
          className={`mt-6 max-w-xl text-[1.0625rem] leading-[1.7] text-mist ${centered ? "mx-auto" : ""}`}
          data-reveal
          style={{ ["--reveal-delay" as string]: "140ms" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
