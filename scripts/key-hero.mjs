/**
 * Keys the black space background out of the hero artwork.
 *
 * WHY THIS EXISTS
 * The supplied hero PNG is a rectangle with its own black starfield baked in.
 * Composited onto the page it always reads as a pasted picture, and no amount
 * of radial masking or gradient blending fixes that — a mask just trades a
 * hard rectangle for a soft one. The only real fix is to remove the artwork's
 * background so the astronaut floats in the PAGE's space, sharing one
 * continuous starfield with the copy beside it.
 *
 * HOW
 * The background measures ~(1,1,3) — essentially pure black, and darker than
 * the page itself (#04050f). So alpha can be derived from luminance:
 *
 *   1. soft alpha = smoothstep(LO, HI, luminance)
 *      Dark → transparent, bright → opaque, with the artwork's own glows
 *      landing on a partial alpha that dissolves into the page.
 *
 *   2. flood-fill the dark pixels inward from the border.
 *      Step 1 alone would punch holes THROUGH the subject: the helmet visor
 *      and the laptop screen are as dark as the sky, and page stars would
 *      shine through the astronaut's face. Only dark regions reachable from
 *      the edge are真 background; enclosed dark regions are the subject and
 *      are restored to opaque.
 *
 * Run:  node scripts/key-hero.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const SRC = path.join(root, "design/masters/hero-astronaut.png");
const OUT = path.join(root, "public/assets/hero-astronaut.webp");

/** Luminance below LO is fully transparent, above HI fully opaque. */
const LO = 3;
const HI = 40;
/**
 * A pixel this dark is a candidate for background flood-fill.
 * Must sit ABOVE the artwork's faint nebula and stars: too low and those
 * wisps form walls the fill cannot cross, stranding large sky regions as
 * false "interior" and leaving the rectangle half intact.
 */
const BG_MAX = 34;
/** Alpha below this is treated as fully transparent. */
const ALPHA_FLOOR = 14;

const smoothstep = (lo, hi, x) => {
  const t = Math.min(1, Math.max(0, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H, channels } = info;
const N = W * H;

// --- pass 1: luminance, soft alpha, background candidates ---------------
const soft = new Uint8Array(N);
const isDark = new Uint8Array(N);

for (let i = 0; i < N; i++) {
  const o = i * channels;
  const lum = 0.2126 * data[o] + 0.7152 * data[o + 1] + 0.0722 * data[o + 2];
  soft[i] = Math.round(smoothstep(LO, HI, lum) * 255);
  if (lum <= BG_MAX) isDark[i] = 1;
}

// --- pass 2: flood-fill dark pixels from the image border ---------------
// Anything reachable is sky. Anything enclosed is subject.
const outside = new Uint8Array(N);
const queue = new Int32Array(N);
let head = 0;
let tail = 0;

const push = (i) => {
  if (!outside[i] && isDark[i]) {
    outside[i] = 1;
    queue[tail++] = i;
  }
};

for (let x = 0; x < W; x++) {
  push(x);
  push((H - 1) * W + x);
}
for (let y = 0; y < H; y++) {
  push(y * W);
  push(y * W + W - 1);
}

while (head < tail) {
  const i = queue[head++];
  const x = i % W;
  const y = (i / W) | 0;
  if (x > 0) push(i - 1);
  if (x < W - 1) push(i + 1);
  if (y > 0) push(i - W);
  if (y < H - 1) push(i + W);
}

// --- pass 3: compose final alpha ----------------------------------------
// Sky keeps its soft (near-zero) alpha so glows fade out gradually.
// Everything else is subject and stays fully opaque.
const out = Buffer.alloc(N * 4);
let keptOpaque = 0;
let fullyClear = 0;

for (let i = 0; i < N; i++) {
  const o = i * channels;
  const q = i * 4;
  let a = outside[i] ? soft[i] : 255;

  // Snap near-nothing to nothing. Alpha in the single digits is invisible
  // against the page but leaves a faint rectangular haze across the whole
  // frame — the ghost of the original crop — and costs real bytes.
  if (a < ALPHA_FLOOR) a = 0;

  if (a === 0) {
    fullyClear++;
    // Invisible pixels still cost bytes: WebP encodes the colour plane even
    // where alpha is zero, and the sky's noise is expensive to compress.
    // Flattening it to black costs nothing visually and shrinks the file by
    // roughly a third.
    out[q] = 0;
    out[q + 1] = 0;
    out[q + 2] = 0;
  } else {
    out[q] = data[o];
    out[q + 1] = data[o + 1];
    out[q + 2] = data[o + 2];
  }

  out[q + 3] = a;
  if (!outside[i]) keptOpaque++;
}

await sharp(out, { raw: { width: W, height: H, channels: 4 } })
  /* The alpha is near-binary over most of the frame — only the artwork's
     glows carry a gradient — so it does not need lossless treatment. */
  .webp({ quality: 80, alphaQuality: 88, effort: 6 })
  .toFile(OUT);

// Preview: the keyed art composited on the page's own background colour, so
// a leftover rectangle or a hole punched through the subject is obvious.
await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: { r: 4, g: 5, b: 15, alpha: 1 },
  },
})
  .composite([
    { input: out, raw: { width: W, height: H, channels: 4 }, blend: "over" },
  ])
  .png()
  .toFile(path.join(root, ".shots/key-preview.png"));

console.log(
  `${W}x${H} → ${path.relative(root, OUT)}\n` +
    `  fully transparent: ${((fullyClear / N) * 100).toFixed(1)}%\n` +
    `  soft glow edge:    ${(((N - keptOpaque - fullyClear) / N) * 100).toFixed(1)}%\n` +
    `  subject kept:      ${((keptOpaque / N) * 100).toFixed(1)}%`
);
