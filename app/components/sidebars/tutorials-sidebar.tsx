"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";
import { getMenuList } from "@/app/lib/menu-list";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { CollapseMenuButton } from "@/app/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/app/components/ui/tooltip";
import { useApp } from "@/app/providers/app-provider";
import { SidebarLayout } from "./sidebar-layout";
import { BlogTOC } from "@/app/lib/generate-blog-toc";
import { TutorialSection } from "@/app/lib/generate-tutorial-toc";
import { TutorialMenu } from "../admin-panel/tutorial-menu";
import { FilterMenu } from "./filter-menu";

interface MenuProps {
  tutorialsToc: TutorialSection[];
}

export function TutorialsSidebar({ tutorialsToc }: MenuProps) {
  return (
    <SidebarLayout>
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="h-full w-full">
          <div className="main-nav-items flex justify-between mx-4 border-bottom mb-4 pb-4 border-gray-400 h-16 lg:hidden">
            <Link
              href="/tutorials"
              className="text-sm font-medium hover:text-[var(--polkadot-purple)] transition"
              prefetch={false}
            >
              Tutorials
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-[var(--polkadot-purple)] transition"
              prefetch={false}
            >
              For Authors
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-[var(--polkadot-purple)] transition"
              prefetch={false}
            >
              Blog
            </Link>
          </div>
          <FilterMenu isOpen={true} />
        </nav>
      </ScrollArea>
    </SidebarLayout>
  );
}
