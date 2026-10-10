import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { airmic } from "@/content/airmic";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = airmic.seo.title;

export default async function OpengraphImage() {
  const icon = await readFile(
    join(process.cwd(), "public/airmic/airmic-app-icon.svg"),
  );
  const iconSrc = `data:image/svg+xml;base64,${icon.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#F6F2EA",
        color: "#1B1A22",
        padding: "96px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <img
          src={iconSrc}
          width={120}
          height={120}
          alt=""
          style={{ borderRadius: 27 }}
        />
        <div
          style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          {airmic.name}
        </div>
      </div>
      <div
        style={{
          marginTop: 48,
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        {airmic.headline}
      </div>
      <div style={{ marginTop: 40, fontSize: 32, color: "#5146E5" }}>
        Join the App Store waitlist
      </div>
    </div>,
    size,
  );
}
