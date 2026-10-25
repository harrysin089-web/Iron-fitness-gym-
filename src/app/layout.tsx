import type { Metadata, Viewport } from "next";
import "@fontsource/big-shoulders-display/700.css";
import "@fontsource/big-shoulders-display/900.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iron Fitness Gym",
  description:
    "Iron Fitness Gym: heavy weights, honest coaching and a floor that never closes. Strength, conditioning, hypertrophy and mobility programs.",
  openGraph: {
    title: "Iron Fitness Gym",
    description: "Heavy weights, honest coaching, open 24/7.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#202327",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-theme="light">{children}</body>
    </html>
  );
}
