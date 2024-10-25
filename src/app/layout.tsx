import type { Metadata } from "next";

import "./globals.css";

import { outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  description: "Quickly generate instagram posts for your brand!",
  icons: ["/favicon.svg"],
  title: "Instagram Post Generator",
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
    <body className={`${outfit.className} antialiased`}>{children}</body>
  </html>
);
