import random from "randomstring";

export const randomString = (length: number, lowercase?: boolean) =>
  random.generate({
    capitalization: lowercase ? "lowercase" : undefined,
    length,
  });

export const formatSlug = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-/]+/g, "")
    .toLowerCase();

export const generateRandomTriangle = (
  alignment: "bottom" | "left" | "right" | "top" = "left",
) => {
  // Define points for each alignment
  let points: string;

  switch (alignment) {
    case "bottom":
      // Bottom-aligned triangle
      points = `0,500 500,500 250,250`;
      break;
    case "left":
      // Left-aligned triangle
      points = `0,0 250,250 0,500`;
      break;
    case "right":
      // Right-aligned triangle
      points = `500,0 250,250 500,500`;
      break;
    case "top":
      // Top-aligned triangle
      points = `0,0 500,0 250,250`;
      break;
    default:
      throw new Error("Invalid alignment value");
  }

  // Construct the SVG string with the specified alignment
  const svg = `
    <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="500" fill="white"/>
      <polygon points="${points}" fill="black"/>
    </svg>
  `;

  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
};

export const randomInt = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min + 1) + min);
