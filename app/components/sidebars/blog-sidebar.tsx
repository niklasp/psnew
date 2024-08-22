"use client";

import Link from "next/link";
import { AirVent, DonutIcon, Ellipsis, FileText, LogOut } from "lucide-react";
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

interface MenuProps {
  isOpen: boolean | undefined;
  blogToc: BlogTOC;
}

export function BlogSidebar({ isOpen, blogToc }: MenuProps) {
  const { posts } = blogToc;
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
          <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px-4rem)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
            <li className={cn("w-full", "pt-5")}>
              <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                Recent Posts
              </p>
              {posts.map((post, index) => (
                <div className="w-full" key={index}>
                  <TooltipProvider disableHoverableContent>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant={false ? "secondary" : "ghost"}
                          className="w-full justify-start h-10 mb-1"
                          asChild
                        >
                          <Link href={post.url} className="flex py-2">
                            <span
                              className={cn(isOpen === false ? "" : "mr-4")}
                            >
                              <FileText size={18} className="mr-1" />
                            </span>
                            <p
                              className={cn(
                                "max-w-[200px] truncate",
                                isOpen === true
                                  ? "-translate-x-96 opacity-0"
                                  : "translate-x-0 opacity-100"
                              )}
                            >
                              {post.title}
                            </p>
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      {isOpen === false && (
                        <TooltipContent side="right">
                          {post.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
              {/* <pre> {JSON.stringify(posts, null, 2)} </pre> */}
            </li>
          </ul>
        </nav>
      </ScrollArea>
    </SidebarLayout>
  );
}
