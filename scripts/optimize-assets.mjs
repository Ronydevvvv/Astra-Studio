/**
 * One-off asset optimisation.
 *
 * The source PNGs come straight out of the render and weigh ~2 MB each.
 * WebP keeps the alpha channel the astronaut cut-outs depend on, at roughly
 * a tenth of the size. Run once; the PNGs are kept as the archival master.
 *
 *   node scripts/optimize-assets.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

/** PNG masters live outside public/ so they never ship. */
const srcDir = path.join(process.cwd(), "design", "masters");
const outDir = path.join(process.cwd(), "public", "assets");
/**
 * The hero is NOT a straight convert. Its master still has the artwork's
 * black sky baked in; scripts/key-hero.mjs removes it and writes the same
 * output path. Converting it here would silently overwrite that cut-out with
 * the rectangular original and bring the collage back.
 */
const KEYED_SEPARATELY = new Set(["hero-astronaut.png"]);

const files = (await readdir(srcDir)).filter(
  (f) => f.endsWith(".png") && !KEYED_SEPARATELY.has(f)
);

for (const file of files) {
  const src = path.join(srcDir, file);
  const dst = path.join(outDir, file.replace(/\.png$/, ".webp"));

  await sharp(src)
    .webp({ quality: 82, effort: 6, alphaQuality: 90 })
    .toFile(dst);

  const before = (await stat(src)).size;
  const after = (await stat(dst)).size;
  console.log(
    `${file.padEnd(28)} ${(before / 1024).toFixed(0).padStart(5)} KB → ${(after / 1024).toFixed(0).padStart(4)} KB  (-${Math.round((1 - after / before) * 100)}%)`
  );
}

console.log(
  `\nSkipped (keyed by scripts/key-hero.mjs): ${[...KEYED_SEPARATELY].join(", ")}`
);
