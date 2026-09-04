import type { SVGProps } from "react";

/**
 * Hand-drawn outline set, one shared grammar: 24px box, 1.4 stroke, round
 * caps and joins, no fills. A library would ship hundreds of icons in a
 * different weight to get the six this site uses — these are ~1kB total and
 * actually match the hairlines used across the page.
 */
const paths: Record<string, React.ReactNode> = {
  /* --- services --- */
  design: (
    <>
      <path d="M4 16.5 16.6 3.9a2.6 2.6 0 0 1 3.7 3.7L7.7 20.2 3 21.4Z" />
      <path d="M14.6 6 18 9.4" />
    </>
  ),
  code: (
    <>
      <path d="m8.5 8-4.5 4 4.5 4" />
      <path d="m15.5 8 4.5 4-4.5 4" />
      <path d="M13.4 5.2 10.6 18.8" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.6 17a9 9 0 1 1 16.8 0" />
      <path d="M12 13.6 16.2 9" />
      <circle cx="12" cy="15.2" r="1.4" />
    </>
  ),
  devices: (
    <>
      <path d="M3 5.5h12.5v8H3z" />
      <path d="M3 17h12.5" />
      <path d="M18 9.5h3v11h-3z" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.3" />
      <path d="m15.6 15.6 4.4 4.4" />
      <path d="M4.7 9.2h12.2" />
    </>
  ),
  support: (
    <>
      <path d="M12 3.2 4.6 6.2v5.5c0 4.3 3 8.1 7.4 9.1 4.4-1 7.4-4.8 7.4-9.1V6.2Z" />
      <path d="m9.2 12 2 2 3.6-3.8" />
    </>
  ),

  /* --- interface --- */
  mail: (
    <>
      <path d="M3.5 6.5h17v11h-17Z" />
      <path d="m4 7 8 6.5L20 7" />
    </>
  ),
  phone: (
    <path d="M7.2 3.6 9.8 8l-2 2.2c1 2.2 2.8 4 5 5l2.2-2 4.4 2.6c.2 1.6-.9 3.6-2.5 4-6.6.2-13-6.2-12.8-12.8.4-1.6 2.4-2.7 4-2.5Z" />
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.6v5" />
      <path d="M12 16.2h.01" />
    </>
  ),
};

export type IconKey = keyof typeof paths;

export function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] ?? null}
    </svg>
  );
}
