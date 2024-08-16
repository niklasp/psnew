"use client";

import { cn } from "@/app/lib/utils";
import { useStore } from "@/app/hooks/use-store";
import { Menu } from "@/app/components/admin-panel/menu";
import { useSidebarToggle } from "@/app/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/app/components/admin-panel/sidebar-toggle";
import { usePathname } from "next/navigation";
import { FilterMenu } from "./filter-menu";

export function Sidebar({ className }: { className?: string }) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const pathname = usePathname();

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 pt-4 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        "mt-[var(--header-height)]",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 pb-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        {pathname === "/tutorials" ? (
          <FilterMenu isOpen={sidebar?.isOpen} />
        ) : (
          <Menu isOpen={sidebar?.isOpen} />
        )}
      </div>
    </aside>
  );
}
