import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "AGN — Cesta Básica & Congelados para empresas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/logo/agn.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAFAF7",
          color: "#0B0B0B",
        }}
      >
        <div style={{ width: 28, height: "100%", background: "#FF6B00" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 80px",
          }}
        >
          {/* ImageResponse só aceita <img>; next/image não roda neste gerador. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={560} height={219} alt="" />
          <div
            style={{
              marginTop: 36,
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Cestas básicas para empresas
          </div>
          <div style={{ marginTop: 22, fontSize: 28, color: "#4A4A4A" }}>
            Venda e distribuição com entrega programada e nota fiscal.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
