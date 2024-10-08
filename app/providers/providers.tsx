"use client";

import { AppProvider } from "./app-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
