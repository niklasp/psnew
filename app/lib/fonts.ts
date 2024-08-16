import {
  JetBrains_Mono as FontMono,
  Inter,
  Unbounded,
  DM_Sans as FontSans,
  Playfair_Display as FontHandwriting
  // Poppins as FontSans,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans"
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const fontUnbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded"
});

export const fontHandwriting = FontHandwriting({
  subsets: ["latin"],
  variable: "--font-handwriting",
  weight: ["400"]
});
