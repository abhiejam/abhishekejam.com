import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#F7F3EA",
        color: "#111111",
        padding: "96px",
      }}
    >
      <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: "-0.03em" }}>
        {site.name}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 40,
          lineHeight: 1.35,
          color: "#4A4740",
          maxWidth: 900,
        }}
      >
        {site.bio}
      </div>
      <div style={{ marginTop: 48, fontSize: 30, color: "#8A857A" }}>
        abhishekejam.com
      </div>
    </div>,
    size,
  );
}
