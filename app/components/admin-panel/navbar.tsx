"use client";

import { ModeToggle } from "@/app/components/mode-toggle";
import { UserNav } from "@/app/components/admin-panel/user-nav";
import { SheetMenu } from "@/app/components/admin-panel/sheet-menu";
import Link from "next/link";
import { PolkadotLogo, PolkadotStudyLogo } from "../icons";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={cn("sticky top-0 z-10 w-full transition-all duration-500", {
        "shadow-sm border-b backdrop-blur ": isScrolled,
        "shadow-none border-b-0 bg-transparent": !isScrolled
      })}
    >
      <div className="mx-4 sm:mx-8 flex h-[var(--header-height)] items-center">
        <div className="flex items-center space-x-4 lg:space-x-0 w-full">
          <SheetMenu />
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 w-72 group"
          >
            <PolkadotStudyLogo
              width={50}
              height={50}
              className="mr-1 fill-black dark:fill-white stroke-black dark:stroke-white"
            />
            <span className="font-bold text hover:underline">
              Polkadot Study
            </span>
            <span className="sr-only">Polkadot Study</span>
          </Link>
          <div className="flex flex-row justify-between w-full !ml-16">
            <nav className="hidden lg:flex items-center space-x-6 flex-1">
              <Link
                href="/tutorials"
                className="text-sm font-medium hover:text-[var(--polkadot-purple)] transition"
                prefetch={false}
              >
                Tutorials
              </Link>
              <Link
                href="/authors"
                className="text-sm font-medium hover:text-[var(--polkadot-purple)] transition"
                prefetch={false}
              >
                For Authors
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium hover:text-[var(--polkadot-purple)] transition"
                prefetch={false}
              >
                Blog
              </Link>
            </nav>
            <div className="flex flex-row">
              <div className="ml-auto relative w-full max-w-md mr-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <SearchIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md pl-9 pr-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--polkadot-purple)] hidden md:flex border-2 border-input bg-background shadow-sm hover:bg-accent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 justify-end">
              <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full w-8 h-8 bg-background"
                    >
                      <Link href="https://github.com/PolkadotStudy/polkadot.study">
                        <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">View on Github</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
