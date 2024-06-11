/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

const switzerBold = fetch(new URL("./Switzer-Bold.otf", import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

const hackRegular = fetch(new URL("./Hack-Regular.ttf", import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export async function GET(request: Request) {
  const switzerBoldFont = await switzerBold;
  const hackRegularFont = await hackRegular;

  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    // ?top=<top>
    const hasTop = searchParams.has("top");
    const top = hasTop
      ? searchParams.get("top")?.slice(0, 100)
      : "My default top";

    const lg = {
      fontSize: "72px",
      lineHeight: "80px",
      fontWeight: 800,
      fontFamily: "SwitzerBold",
      color: "#f4f4f5",
    };

    const md = {
      fontSize: "62px",
      lineHeight: "70px",
      fontWeight: 900,
      fontFamily: "SwitzerBold",
      color: "#f4f4f5",
    };

    const element = (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4d4d8",
          background: "#18181b",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            width: "1200px",
            height: "630px",
            padding: "80px",
          }}
        >
          <p
            style={{
              fontFamily: "HackRegular",
              fontSize: "28px",
              marginBottom: "25px",
            }}
          >
            {top}
          </p>

          <h1 style={title!.length < 60 ? lg : md}>{title}</h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p
              style={{
                fontFamily: "HackRegular",
                fontSize: "28px",
              }}
            >
              bencodes.dev
            </p>
          </div>
        </div>
      </div>
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SwitzerBold",
          data: switzerBoldFont,
          style: "normal",
        },
        {
          name: "HackRegular",
          data: hackRegularFont,
          style: "normal",
        },
      ],
    });
  } catch (e: unknown) {
    //@ts-expect-error e unknown
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
