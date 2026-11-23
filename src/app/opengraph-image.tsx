import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Social share card (Open Graph + Twitter fallback). Generated once at build time, so it works
// with the static export. Colours mirror the tokens in globals.css.
export const alt = `${siteConfig.name} | ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required by `output: "export"`: render once at build time.
export const dynamic = "force-static";

const color = {
  ink: "#191919",
  raised: "#353535",
  fg: "#fafafa",
  muted: "#b3b3b3",
  accent: "#00d6b4",
};

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const domain = siteConfig.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: `radial-gradient(900px circle at 85% 0%, rgba(0,214,180,0.16), transparent 60%), ${color.ink}`,
          color: color.fg,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              background: color.accent,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori only renders <img> */}
            <img src={logoSrc} alt="" width={46} height={46} />
          </div>
          <div style={{ fontSize: 34, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {siteConfig.role.charAt(0).toUpperCase() + siteConfig.role.slice(1)}
          </div>
          <div style={{ fontSize: 30, color: color.muted, maxWidth: 940, lineHeight: 1.4 }}>
            n8n workflows, RAG agents, API integrations and self-hosted systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingTop: 28,
            borderTop: `2px solid ${color.raised}`,
            fontSize: 24,
            color: color.muted,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: color.accent }} />
          {domain}
        </div>
      </div>
    ),
    size,
  );
}
