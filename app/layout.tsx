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
  children,
  sidebar
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-gradient-to-br from-[#ffdee9] via-[#fffbef] to-[#e7e5ee] dark:from-[#1a202c] dark:via-[#2d3748] dark:to-[#1a202c]",
          fontSans.className
        )}
      >
        <Providers>
          <Navbar title="" />
          {sidebar}
          {children}
        </Providers>
      </body>
    </html>
  );
}
