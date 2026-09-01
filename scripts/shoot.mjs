/**
 * Visual QA harness.
 *
 * Loads every route at every breakpoint, forces all scroll reveals so nothing
 * is captured mid-animation, then reports horizontal overflow, console
 * errors, failed requests and broken links. Screenshots land in .shots/.
 *
 *   node scripts/shoot.mjs http://localhost:3001
 *   node scripts/shoot.mjs http://localhost:3001 --full   (full-page shots)
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.argv[2] ?? "http://localhost:3001";
const full = process.argv.includes("--full");

const ROUTES = [
  ["accueil", "/"],
  ["services", "/services"],
  ["realisations", "/realisations"],
  ["projet", "/realisations/site-vitrine"],
  ["tarifs", "/tarifs"],
  ["a-propos", "/a-propos"],
  ["contact", "/contact"],
  ["mentions-legales", "/mentions-legales"],
  ["confidentialite", "/politique-confidentialite"],
  ["cookies", "/cookies"],
];

const VIEWPORTS = [
  { name: "1920", width: 1920, height: 1080 },
  { name: "1440", width: 1440, height: 900 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1024", width: 1024, height: 768 },
  { name: "768", width: 768, height: 1024 },
  { name: "480", width: 480, height: 900 },
  { name: "390", width: 390, height: 844 },
  { name: "375", width: 375, height: 812 },
];

await mkdir(".shots", { recursive: true });

const browser = await chromium.launch();
const report = [];
let problems = 0;

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: "no-preference",
  });

  for (const [label, route] of ROUTES) {
    const page = await context.newPage();
    const errors = [];
    const failed = [];

    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("requestfailed", (r) =>
      failed.push(`${r.url()} — ${r.failure()?.errorText}`)
    );
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });

    await page.goto(base + route, { waitUntil: "load" });

    // Force every reveal so no element is captured mid-transition.
    await page.evaluate(() => {
      document
        .querySelectorAll("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
    });
    await page.waitForTimeout(500);

    const audit = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const wide = [];
      document.querySelectorAll("*").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > docW + 1.5) {
          wide.push(
            `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} → ${Math.round(r.right)}`
          );
        }
      });
      const brokenImgs = [...document.querySelectorAll("img")]
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.getAttribute("src"));
      const links = [...document.querySelectorAll("a[href^='/']")].map((a) =>
        a.getAttribute("href")
      );
      return {
        scrollW: document.documentElement.scrollWidth,
        docW,
        wide: wide.slice(0, 4),
        brokenImgs,
        links: [...new Set(links)],
      };
    });

    const overflow = audit.scrollW > audit.docW + 1;
    const bad =
      overflow || errors.length > 0 || failed.length > 0 || audit.brokenImgs.length > 0;
    if (bad) problems++;

    const line =
      `[${vp.name}] ${route.padEnd(30)} ` +
      (overflow ? `OVERFLOW ${audit.scrollW}>${audit.docW}` : "ok") +
      ` | err ${errors.length} | net ${failed.length} | img ${audit.brokenImgs.length}`;
    console.log(line);
    report.push(line);

    // Only useful when the document actually scrolls sideways: plenty of
    // elements legitimately extend past the viewport inside an
    // overflow-hidden parent, and listing those is pure noise.
    if (overflow) for (const w of audit.wide) console.log(`    ↳ ${w}`);
    for (const e of errors.slice(0, 3)) console.log(`    ! ${e.slice(0, 140)}`);
    for (const f of failed.slice(0, 3)) console.log(`    ! ${f.slice(0, 140)}`);
    for (const i of audit.brokenImgs) console.log(`    ! broken img ${i}`);

    if (vp.name === "1440" || vp.name === "390") {
      await page.screenshot({
        path: `.shots/${vp.name}-${label}.png`,
        fullPage: full,
      });
    }

    await page.close();
  }

  await context.close();
}

await browser.close();
await writeFile(".shots/report.txt", report.join("\n"), "utf8");
console.log(
  problems === 0
    ? "\nAll routes clean at every breakpoint."
    : `\n${problems} route/breakpoint combination(s) with problems.`
);
