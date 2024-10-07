import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Providers from "./provider";
import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intersection Observer Infinity Scroll",
  description: "Intersection Observer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-black`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
