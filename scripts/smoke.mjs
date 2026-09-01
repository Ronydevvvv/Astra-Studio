/**
 * Quick check that the dev server actually renders every route.
 *
 *   node scripts/smoke.mjs http://localhost:3000
 */
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const routes = [
  "/",
  "/services",
  "/realisations",
  "/realisations/site-vitrine",
  "/tarifs",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
  "/cookies",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
let bad = 0;

for (const route of routes) {
  const errors = [];
  page.removeAllListeners("pageerror");
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));

  const res = await page.goto(base + route, { waitUntil: "load", timeout: 90_000 });
  await page.waitForTimeout(400);

  const h1 = await page.$eval("h1", (el) => el.textContent?.trim().slice(0, 48)).catch(() => null);
  const ok = res?.status() === 200 && h1 && errors.length === 0;
  if (!ok) bad++;

  console.log(
    `${ok ? "ok  " : "FAIL"} ${String(res?.status()).padEnd(4)} ${route.padEnd(30)} h1="${h1 ?? "—"}"` +
      (errors.length ? `  err: ${errors[0]}` : "")
  );
}

await browser.close();
console.log(bad === 0 ? "\nAll routes render." : `\n${bad} route(s) failing.`);
process.exit(bad === 0 ? 0 : 1);
