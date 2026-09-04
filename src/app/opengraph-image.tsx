import { ImageResponse } from "next/og";

export const alt = "ASTRA Studio — Agence de création de sites web sur mesure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at request time from the site's own mark and palette — no
 * external asset, so it can never drift from the real brand. Reuses the
 * exact star path from Logo.tsx so the share preview and the live site
 * show the same identity.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#04050f",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 22% 30%, rgba(124,58,245,0.35), transparent 60%)",
            display: "flex",
          }}
        />

        <svg width="96" height="96" viewBox="0 0 48 48" style={{ marginBottom: 32 }}>
          <path
            d="M24 3.2 30.1 17.9 45.8 19.2 33.9 29.6 37.5 45 24 36.8 10.5 45l3.6-15.4L2.2 19.2l15.7-1.3Z"
            fill="none"
            stroke="#7c3af5"
            strokeWidth="2.6"
          />
          <path
            d="M24 15.4 27 22.6 34.7 23.2 28.9 28.3 30.6 35.8 24 31.8 17.4 35.8l1.7-7.5-5.8-5.1 7.7-.6Z"
            fill="#9a6bff"
          />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            color: "#f5f4fb",
            letterSpacing: -2,
          }}
        >
          ASTRA STUDIO
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            color: "#9b9bb8",
          }}
        >
          Agence de création de sites web sur mesure
        </div>
      </div>
    ),
    { ...size }
  );
}
