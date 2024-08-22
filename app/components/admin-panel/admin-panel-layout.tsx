"use client";

import { cn } from "@/app/lib/utils";
import { useStore } from "@/app/hooks/use-store";
import { Footer } from "@/app/components/admin-panel/footer";
import { useSidebarToggle } from "@/app/hooks/use-sidebar-toggle";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments
} from "next/navigation";
import { Sidebar } from "../sidebars/sidebar";

export default function AdminPanelLayout({
  children,
  sidebarElement = <Sidebar />
}: {
  children: React.ReactNode;
  sidebarElement?: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      {sidebarElement}
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          sidebarElement ? "lg:ml-72" : "lg:ml-0"
          // sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
