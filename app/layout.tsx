import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SkipLink } from "@/components/chrome/SkipLink";
import { Nav } from "@/components/chrome/Nav";
import { BookendFooter } from "@/components/chrome/BookendFooter";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  // mono is only used for small accents — keep it off the critical path
  preload: false,
});

const clash = localFont({
  variable: "--font-clash",
  display: "swap",
  // single display weight keeps the preload budget lean (perf budget §9)
  src: [
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Jassim M. Shamim — Digital Accessibility Engineer",
    template: "%s — Jassim M. Shamim",
  },
  description:
    "Digital Accessibility Engineer & Creative Technologist. Building a digital world that's beautiful and built for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${clash.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <BookendFooter />
      </body>
    </html>
  );
}
