/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { randomInt } from "crypto";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const dynamic = "force-dynamic";

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();

    const image = data.get("cover") as File;
    const title = data.get("title") as string;

    const blur = data.get("blur") === "on";
    if (!image || !title) {
      return new Response(null, {
        status: 422,
      });
    }

    const font = await getFont();
    if (!font) throw new Error();

    const { height, imageBase64, width } = await imageToBase64(image);

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            height: "1080px",
            position: "relative",
            width: "1080px",
          }}>
          <img
            alt=""
            height={height}
            src={imageBase64}
            style={{
              filter: `blur(${blur ? "6px" : "0px"})`,
              height: "100%",
              left: 0,
              objectFit: "cover",
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: "0",
            }}
            width={width}
          />

          {/* <img
            src="https://utfs.io/f/KUwXnImZPF2hU0JGnApOBRSFJq9E5TnWkIge6vuzCKGxc0bt"
            tw="w-40 absolute right-4 top-4"
          /> */}

          <div tw="w-full absolute left-0 top-0 bg-white flex flex-row items-center justify-between px-4 py-2">
            <span tw="text-3xl">@ridewithapex</span>
            <span tw="text-3xl">www.ridingapex.com</span>
          </div>

          <div
            style={{
              backgroundColor: "#ef233c",
              bottom: 0,
              height: "600px",
              left: 0,
              marginBottom: "-600px",
              marginLeft: "-600px",
              opacity: 0.8,
              position: "absolute",
              transform: `rotate(${randomInt(30, 45)}deg)`,
              width: "200%",
            }}
            tw="blur-sm"
          />
          <div
            style={{
              backgroundColor: "#ef233c",
              bottom: 0,
              height: "600px",
              marginBottom: "-500px",
              marginRight: "-700px",
              opacity: 0.8,
              position: "absolute",
              right: 0,
              transform: `rotate(-${randomInt(20, 30)}deg)`,
              width: "300%",
            }}
            tw="blur-sm"
          />

          <div
            style={{
              background:
                "linear-gradient(to top, transparent 20%, rgba(0, 0, 0, 0))",
            }}
            tw="bottom-0 flex text-white p-4 absolute left-0 z-10 w-full">
            <h1
              style={{
                fontSize: "3.5rem",
                margin: 0,
                paddingTop: "500px",
                width: "95%",
              }}>
              {title}
            </h1>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            data: font,
            name: "Raleway",
            style: "normal",
          },
        ],
        height: 1080,
        width: 1080,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};

const imageToBase64 = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const { height, width } = await sharp(arrayBuffer).metadata();

  if (!width || !height) throw new Error();

  const imgBuffer = await sharp(arrayBuffer).png({ quality: 50 }).toBuffer();
  const imageBase64 = `data:image/png;base64,${imgBuffer.toString("base64")}`;

  return { height, imageBase64, width };
};

const getFont = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets/fonts/Outfit-Medium.ttf`,
  );
  if (res.ok) return await res.arrayBuffer();
};
