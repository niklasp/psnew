import type { Metadata } from "next";

import "@/app/globals.scss";

import { ThemeProvider } from "@/app/providers/theme-provider";
import { fontSans } from "./lib/fonts";
import { MainNav } from "./components/admin-panel/mainnav";
import { cn } from "./lib/utils";
import { Providers } from "@/app/providers/providers";
import { Navbar } from "./components/admin-panel/navbar";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "shadcn/ui sidebar",
  description:
    "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "shadcn/ui sidebar",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "shadcn/ui sidebar",
    description:
      "A stunning and functional retractable sidebar for Next.js built on top of shadcn/ui complete with desktop and mobile responsiveness."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background", fontSans.className)}>
        <Providers>
          <Navbar title="" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
