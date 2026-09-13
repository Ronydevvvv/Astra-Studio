/**
 * Display type set line by line, each line rising out of its own clipping
 * box a beat after the one above it.
 *
 * The lines are authored in content.ts rather than measured at runtime:
 * a JS text-splitter has to wait for fonts, reflows on every resize, and
 * breaks a heading differently on a narrow screen than the designer
 * intended. Where a line ends is a typographic decision, so it lives with
 * the words.
 *
 * Purely presentational — the parent carries `data-reveal`, this only
 * supplies the structure and the stagger. Screen readers see one heading
 * with normal text because each line is a plain block span.
 */
export function Lines({
  lines,
  /** Index from which lines switch to the recessed grey. */
  mutedFrom,
  /** Milliseconds between consecutive lines. */
  stagger = 90,
  className = "",
  as: Tag = "span",
}: {
  lines: string[];
  mutedFrom?: number;
  stagger?: number;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span
          key={line + i}
          className={`line ${mutedFrom !== undefined && i >= mutedFrom ? "text-mist" : ""}`}
        >
          <span style={{ ["--line-delay" as string]: `${i * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
