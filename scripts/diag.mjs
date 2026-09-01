import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(base + "/services", { waitUntil: "load" });
await page.waitForTimeout(500);
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
});
await page.waitForTimeout(500);

const info = await page.evaluate(() => {
  const docH = document.body.scrollHeight;
  return {
    docH,
    scrollY: window.scrollY,
    vh: window.innerHeight,
    hidden: [...document.querySelectorAll("[data-reveal]:not(.is-visible)")].map(
      (el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          cls: String(el.className).slice(0, 70),
          top: Math.round(r.top + window.scrollY),
          h: Math.round(r.height),
          w: Math.round(r.width),
        };
      }
    ),
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
