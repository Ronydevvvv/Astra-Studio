/**
 * Removes detached fragments from the character cut-outs.
 *
 * Two defects were measured in the shipped WebPs:
 *
 *   process-04-launch — a 31px-tall sliver of the PREVIOUS character (03's
 *     laptop) survives at the left edge. The four figures overlap
 *     horizontally in the source strip, so the original straight vertical cut
 *     could not separate them.
 *
 *   idea-astronaut — a detached blob at columns 760-776 plus stray specks
 *     along the left edge, left over from keying the studio background.
 *
 * A vertical re-cut cannot fix either: the fragments are at different heights
 * than the subject. Connected-component labelling can — the subject is one
 * large blob, every fragment is a small separate one. Keep the components
 * that make up the figure, drop the rest.
 *
 * Run:  node scripts/repair-assets.mjs
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * A pure size threshold is WRONG here, and deleted the lightbulb's radiating
 * rays on the first run: they are legitimately detached components, drawn as
 * separate dashes around the bulb.
 *
 * What actually distinguishes debris is POSITION. Every real detached piece —
 * the rays, the bulb itself — sits inside the figure's own bounding box. The
 * fragments to remove lie outside it entirely: the sliver of character 03 is
 * to the LEFT of everything character 04 owns.
 *
 * So: keep anything that overlaps the main component's box, drop what falls
 * outside it, and sweep single-pixel specks wherever they are.
 */
const SPECK_MAX = 4;
const ALPHA_MIN = 24;
/**
 * How close a detached piece must sit to the figure to count as part of it.
 * The bulb's rays are within a few dozen pixels of the bulb; the sliver of
 * character 03 is ~140px from anything character 04 owns.
 */
const NEAR_PX = 45;

async function repair(name) {
  const src = path.join(root, "design/masters", `${name}.png`);
  const out = path.join(root, "public/assets", `${name}.webp`);

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const N = W * H;

  // --- label connected components of opaque pixels (4-neighbour BFS) ---
  const label = new Int32Array(N).fill(-1);
  const queue = new Int32Array(N);
  const comps = [];

  for (let seed = 0; seed < N; seed++) {
    if (label[seed] !== -1 || data[seed * 4 + 3] <= ALPHA_MIN) continue;

    const id = comps.length;
    let head = 0;
    let tail = 0;
    label[seed] = id;
    queue[tail++] = seed;
    let area = 0;
    let minX = W;
    let maxX = 0;
    let minY = H;
    let maxY = 0;

    while (head < tail) {
      const i = queue[head++];
      const x = i % W;
      const y = (i / W) | 0;
      area++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;

      const push = (j) => {
        if (label[j] === -1 && data[j * 4 + 3] > ALPHA_MIN) {
          label[j] = id;
          queue[tail++] = j;
        }
      };
      if (x > 0) push(i - 1);
      if (x < W - 1) push(i + 1);
      if (y > 0) push(i - W);
      if (y < H - 1) push(i + W);
    }

    comps.push({ id, area, minX, maxX, minY, maxY });
  }

  comps.sort((a, b) => b.area - a.area);
  const main = comps[0];

  /**
   * Bounding-box overlap is useless here — the figure's box spans almost the
   * whole canvas, so every fragment "overlaps" it. What separates a ray from
   * debris is actual proximity, so scan the band around the candidate for
   * pixels belonging to the figure.
   */
  const nearMain = (c) => {
    const x0 = Math.max(0, c.minX - NEAR_PX);
    const x1 = Math.min(W - 1, c.maxX + NEAR_PX);
    const y0 = Math.max(0, c.minY - NEAR_PX);
    const y1 = Math.min(H - 1, c.maxY + NEAR_PX);
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        if (label[y * W + x] === main.id) return true;
      }
    }
    return false;
  };

  const keep = new Set(
    comps
      .filter((c) => c.id === main.id || (c.area > SPECK_MAX && nearMain(c)))
      .map((c) => c.id)
  );
  const dropped = comps.filter((c) => !keep.has(c.id));

  // --- rewrite alpha, erasing every dropped component ---
  const pixels = Buffer.from(data);
  let erased = 0;
  for (let i = 0; i < N; i++) {
    const l = label[i];
    if (l !== -1 && !keep.has(l)) {
      pixels[i * 4] = 0;
      pixels[i * 4 + 1] = 0;
      pixels[i * 4 + 2] = 0;
      pixels[i * 4 + 3] = 0;
      erased++;
    }
  }

  await sharp(pixels, { raw: { width: W, height: H, channels: 4 } })
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(out);

  console.log(`${name}  ${W}x${H}`);
  console.log(
    `  main figure: ${main.area}px @ x${main.minX}-${main.maxX} y${main.minY}-${main.maxY}`
  );
  console.log(`  components: ${comps.length}  kept: ${keep.size}`);
  if (dropped.length) {
    const shown = dropped
      .slice(0, 6)
      .map((c) => `${c.area}px @ x${c.minX}-${c.maxX} y${c.minY}-${c.maxY}`);
    console.log(`  dropped ${dropped.length} fragment(s), ${erased}px total`);
    shown.forEach((s) => console.log(`    · ${s}`));
  } else {
    console.log("  nothing to drop — already clean");
  }
}

for (const name of [
  "process-01-discovery",
  "process-02-design",
  "process-03-build",
  "process-04-launch",
  "idea-astronaut",
]) {
  await repair(name);
}
