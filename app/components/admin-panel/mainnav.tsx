"use client";

import { PanelsTopLeft, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "../mode-toggle";
import { PolkadotLogo } from "../icons";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { use, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export function MainNav() {
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
      className={cn(
        "z-[50] sticky top-0 w-full backdrop-blur-sm transition-all duration-300 border-gray-100/20 dark:border-gray-900/20",
        {
          "shadow-sm border-b bg-white/60 dark:bg-slate-900/60": isScrolled,
          "shadow-none border-b-0": !isScrolled
        }
      )}
    >
      <div className="h-[var(--header-height)] flex items-center px-8 md:px-6 justify-between">
        <Link
          href="/"
          className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 w-72"
        >
          <PolkadotLogo
            width={30}
            height={30}
            className="animate-polkadot-colors mr-2 shadow-sm w-64"
          />
          <span className="font-bold text hover:underline">Polkadot Study</span>
          <span className="sr-only">Polkadot Study</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
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
        </nav>
        <div className="flex flex-row">
          <div className="ml-auto relative w-full max-w-md mr-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md bg-foreground/60 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--polkadot-purple)] focus:border-primary"
            />
          </div>
          <nav className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 bg-background"
              asChild
            >
              <Link href="https://github.com/salimi-my/shadcn-ui-sidebar">
                <GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
              </Link>
            </Button>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
