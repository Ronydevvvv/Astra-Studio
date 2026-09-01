/**
 * Proves client-side navigation actually renders content.
 *
 * The bug this guards against: a reveal controller that only observed on
 * first mount left every page after a menu click at opacity 0 — the route
 * changed, the DOM was there, and the viewport was blank until a manual
 * refresh. A 200 status and a present <h1> are NOT enough to catch that, so
 * this measures painted opacity, not existence.
 *
 *   node scripts/nav-test.mjs http://localhost:3000
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const LINKS = ["Services", "Réalisations", "Tarifs", "À propos", "Contact", "Accueil"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let bad = 0;

/**
 * Two separate questions, because "how many reveals are painted" answers
 * neither on its own — blocks below the fold are *supposed* to be hidden.
 *
 *   blank   → is the first screen empty? (the actual reported bug)
 *   pending → after scrolling the whole page, is anything still hidden?
 */
async function audit() {
  const blank = await page.evaluate(() => {
    // Any text node painted inside the first viewport.
    const vh = window.innerHeight;
    const els = [...document.querySelectorAll("h1,h2,h3,p,a,li,label,button")];
    return !els.some((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0 || r.width === 0) return false;
      const cs = getComputedStyle(el);
      return (
        parseFloat(cs.opacity) > 0.01 &&
        cs.visibility !== "hidden" &&
        (el.textContent ?? "").trim().length > 0
      );
    });
  });

  // Walk the page so every reveal gets its chance. The dwell per step has to
  // outlast an IntersectionObserver callback flush — at 120ms the observer
  // lagged the scroll and the test reported phantom stragglers.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
  });
  await page.waitForTimeout(600);

  const pending = await page.evaluate(
    () => document.querySelectorAll("[data-reveal]:not(.is-visible)").length
  );

  await page.evaluate(() => window.scrollTo(0, 0));
  return { blank, pending };
}

console.log("— client-side navigation (menu clicks, no reload) —");
await page.goto(base, { waitUntil: "load" });
await page.waitForTimeout(600);

for (const label of LINKS) {
  await page.click(`header nav a:has-text("${label}")`);
  await page.waitForLoadState("load");
  await page.waitForTimeout(900);

  const url = new URL(page.url()).pathname;
  const { blank, pending } = await audit();
  const ok = !blank && pending === 0;
  if (!ok) bad++;

  console.log(
    `${ok ? "ok  " : "FAIL"} ${label.padEnd(14)} → ${url.padEnd(16)}` +
      `${blank ? " BLANK FIRST SCREEN" : ""}${pending ? ` ${pending} still hidden after scroll` : ""}`
  );
}

console.log("\n— logo returns home —");
await page.click('header a[aria-label*="ASTRA"]');
await page.waitForTimeout(700);
const home = new URL(page.url()).pathname === "/";
if (!home) bad++;
console.log(`${home ? "ok  " : "FAIL"} logo → ${new URL(page.url()).pathname}`);

console.log("\n— direct URL entry (cold load) —");
for (const path of ["/services", "/realisations", "/tarifs", "/a-propos", "/contact"]) {
  await page.goto(base + path, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const { blank, pending } = await audit();
  const ok = !blank && pending === 0;
  if (!ok) bad++;
  console.log(
    `${ok ? "ok  " : "FAIL"} ${path.padEnd(18)}` +
      `${blank ? " BLANK FIRST SCREEN" : ""}${pending ? ` ${pending} still hidden after scroll` : ""}`
  );
}

await browser.close();
console.log(bad === 0 ? "\nNavigation clean." : `\n${bad} failure(s).`);
process.exit(bad === 0 ? 0 : 1);
