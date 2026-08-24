import type { Metadata } from "next";
import { Silkscreen, IBM_Plex_Sans_Thai, IBM_Plex_Mono } from "next/font/google";
import TopNav from "@/components/TopNav";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const plexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-plex-sans-thai",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Mastery Codex",
  description: "A game-style status window for tracking mastery across coursework.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${silkscreen.variable} ${plexSansThai.variable} ${plexMono.variable}`}
      >
        <TopNav />
        {children}
      </body>
    </html>
  );
}
