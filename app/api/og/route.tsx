import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-static";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get("title") ?? "The UN of Barbershops";
  const subtitle =
    url.searchParams.get("subtitle") ??
    "Six chairs across Newfoundland & Labrador";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(ellipse at top, rgba(200,163,90,0.18), transparent 50%), #0b0b0c",
          color: "#f5f1e8",
          fontFamily: "Georgia, serif",
          padding: 80,
          position: "relative",
        }}
      >
        {/* Decorative ring backdrop */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 720,
            height: 720,
            border: "1px solid rgba(200,163,90,0.18)",
            borderRadius: 9999,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -60,
            top: -60,
            width: 520,
            height: 520,
            border: "1px solid rgba(200,163,90,0.28)",
            borderRadius: 9999,
            display: "flex",
          }}
        />

        {/* Logo medallion */}
        <div
          style={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 360,
            height: 360,
            borderRadius: 9999,
            border: "1.5px solid rgba(200,163,90,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 9999,
              border: "1px solid rgba(200,163,90,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -8,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#c8a35a",
                fontFamily: "system-ui, sans-serif",
                fontSize: 14,
                letterSpacing: 6,
                fontWeight: 600,
                display: "flex",
              }}
            >
              BARBER · SHOP
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 120,
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#e6c47a",
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                19
              </div>
              <div
                style={{
                  width: 1.5,
                  height: 100,
                  background:
                    "linear-gradient(to bottom, transparent, rgba(245,241,232,0.5), transparent)",
                }}
              />
              <div
                style={{
                  fontSize: 120,
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#c8a35a",
                  letterSpacing: -2,
                  lineHeight: 1,
                }}
              >
                49
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 6,
                left: "50%",
                transform: "translateX(-50%)",
                color: "#c8a35a",
                fontFamily: "system-ui, sans-serif",
                fontSize: 11,
                letterSpacing: 4,
                fontWeight: 500,
                display: "flex",
              }}
            >
              THE · UN · OF · BARBERSHOPS
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 10,
            maxWidth: 720,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#c8a35a",
              fontSize: 16,
              letterSpacing: 6,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: "#c8a35a",
                borderRadius: 9999,
                display: "flex",
              }}
            />
            1949 BARBER SHOP · NEWFOUNDLAND
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 96,
                fontStyle: "italic",
                fontWeight: 500,
                lineHeight: 0.92,
                letterSpacing: -3,
                color: "#f5f1e8",
              }}
            >
              {title}
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 26,
                color: "#b8b2a3",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 400,
                maxWidth: 600,
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 16,
              color: "#74706a",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <span>St. John&apos;s</span>
            <span style={{ color: "#c8a35a" }}>·</span>
            <span>CBS</span>
            <span style={{ color: "#c8a35a" }}>·</span>
            <span>Mt. Pearl</span>
            <span style={{ color: "#c8a35a" }}>·</span>
            <span>Gander</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
