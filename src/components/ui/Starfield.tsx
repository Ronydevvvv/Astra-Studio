/**
 * Deterministic starfield.
 *
 * Rendered on the server as plain SVG — no canvas, no rAF loop, no hydration
 * mismatch (the PRNG is seeded, so server and client produce identical markup).
 * Only three layer drifts and a handful of twinkles actually animate.
 */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type LayerProps = {
  seed: number;
  count: number;
  radius: [number, number];
  opacity: number;
  twinkle?: number;
  duration: number;
};

function Layer({ seed, count, radius, opacity, twinkle = 0, duration }: LayerProps) {
  const rand = mulberry32(seed);
  const stars = Array.from({ length: count }, (_, i) => ({
    cx: +(rand() * 100).toFixed(2),
    cy: +(rand() * 100).toFixed(2),
    r: +(radius[0] + rand() * (radius[1] - radius[0])).toFixed(2),
    delay: +(rand() * 6).toFixed(2),
    twinkles: i < twinkle,
  }));

  return (
    <g
      className="animate-drift"
      style={{ animationDuration: `${duration}s`, opacity }}
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={`${s.cx}%`}
          cy={`${s.cy}%`}
          r={s.r}
          fill="#fff"
          style={
            s.twinkles
              ? {
                  animation: `astra-twinkle ${5 + s.delay}s ease-in-out ${s.delay}s infinite`,
                }
              : undefined
          }
        />
      ))}
    </g>
  );
}

export function Starfield({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <Layer seed={7} count={90} radius={[0.4, 0.9]} opacity={0.32} duration={110} />
      <Layer
        seed={31}
        count={42}
        radius={[0.7, 1.3]}
        opacity={0.55}
        twinkle={16}
        duration={78}
      />
      <Layer
        seed={97}
        count={14}
        radius={[1.2, 1.9]}
        opacity={0.75}
        twinkle={6}
        duration={52}
      />
    </svg>
  );
}
