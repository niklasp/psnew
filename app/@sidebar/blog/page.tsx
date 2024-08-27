import { SidebarLayout } from "@/app/components/sidebars/sidebar-layout";
import generateBlogToc from "@/app/lib/generate-blog-toc";

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
import { BlogTOC } from "@/app/lib/generate-blog-toc";

interface MenuProps {
  isOpen: boolean | undefined;
  blogToc: BlogTOC;
}

export default async function BlogSidebar() {
  const blogToc = await generateBlogToc();

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
              {blogToc.posts.map((post, index) => (
                <div className="w-full" key={index}>
                  <Link
                    href={post.url ? post.url : `/blog/${post.slug}`}
                    className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                    prefetch={false}
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
                      {post.title}
                    </span>
                  </Link>
                </div>
              ))}
            </li>
          </ul>
          <pre> {JSON.stringify(blogToc?.posts, null, 2)} </pre>
        </nav>
      </ScrollArea>
    </SidebarLayout>
  );
}
