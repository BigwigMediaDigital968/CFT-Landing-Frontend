import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "./Component/WhatsAppFloat";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Close Friends Traders | Smart Trading Solutions",
  description:
    "A future-focused team of innovators, analysts, and strategists helping you build your digital asset portfolio easily, securely, and intelligently.",
  keywords: [
    "crypto trading",
    "digital assets",
    "trading signals",
    "close friends traders",
  ],
  icons: {
    icon: "/logo-cft.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body
        style={{
          fontFamily: "var(--font-sora), 'DM Sans', system-ui, sans-serif",
        }}
      >
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
