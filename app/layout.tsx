import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./foundation.css";
import "./hero-override.css";
import "./vision.css";
import "./market.css";
import "./market-story.css";
import "./market-story-override.css";
import "./vision-rhythm.css";
import "./navbar-override.css";
import "./navbar-motion.css";
import "./hero-cinematic.css";
import "./vision-campaign.css";
import "./vision-reference-refine.css";
import "./ecosystem.css";
import "./products.css";
import "./marketplace.css";
import "./network.css";
import "./roadmap.css";
import "./closing.css";
import { I18nProvider } from "@/lib/i18n/context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GlemO — Digital real estate ecosystem",
  description: "Building the global market across Web 2 and Web 3",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
