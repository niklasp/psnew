"use client";

import { cn } from "@/app/lib/utils";
import { useStore } from "@/app/hooks/use-store";
import { useSidebarToggle } from "@/app/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/app/components/admin-panel/sidebar-toggle";
import { usePathname } from "next/navigation";
import { FilterMenu } from "./filter-menu";
import { Menu } from "./menu";
import { BlogMenu } from "./blog-sidebar";
import { SidebarLayout } from "./sidebar-layout";

export function Sidebar({
  className,
  sidebarElement
}: {
  className?: string;
  sidebarElement?: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  const pathname = usePathname();

  if (!sidebar) return null;

  let _sidebarElement = sidebarElement;

  if (!_sidebarElement) {
    _sidebarElement = (() => {
      if (pathname === "/tutorials") {
        return <FilterMenu isOpen={sidebar?.isOpen} />;
      } else if (pathname.startsWith("/tutorials/")) {
        return <>test</>;
      } else {
        return <Menu isOpen={sidebar?.isOpen} />;
      }
    })();
  }

  return (
    <SidebarLayout isOpen={sidebar.isOpen} setIsOpen={sidebar.setIsOpen}>
      {sidebarElement}
    </SidebarLayout>
  );
}
