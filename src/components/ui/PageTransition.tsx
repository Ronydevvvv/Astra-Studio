"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Replays the `.page-enter` CSS rise on every route change.
 *
 * `<main className="page-enter">` alone only plays once: a client-side
 * `<Link>` navigation swaps `children` in place without remounting `<main>`,
 * and a CSS animation never replays on an element that was never removed
 * and re-added. Keying this wrapper by pathname forces React to tear down
 * and recreate the node on each navigation, which is what makes the
 * animation fire again — the one thing that made every route change land
 * with zero transition despite the animation existing in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
