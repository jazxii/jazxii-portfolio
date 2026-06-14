import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SkipLink } from "@/components/chrome/SkipLink";
import { Nav } from "@/components/chrome/Nav";
import { BookendFooter } from "@/components/chrome/BookendFooter";
import { Cursor } from "@/components/chrome/Cursor";
import "./globals.css";

// Applies a stored explicit theme choice before first paint (no FOUC).
// When nothing is stored we leave data-theme unset so the system preference
// (and the prefers-color-scheme media query) keeps governing.
const THEME_INIT = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}`;

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
      // the theme init script sets data-theme before hydration, so the
      // server/client <html> attributes legitimately differ — silence it
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${clash.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Decorative ambient backdrop on every route: blue top-glow + grain */}
        <div aria-hidden="true" className="ambient">
          <div className="ambient-glow" />
          <div className="ambient-grain" />
        </div>
        <SkipLink />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <BookendFooter />
        <Cursor />
      </body>
    </html>
  );
}
