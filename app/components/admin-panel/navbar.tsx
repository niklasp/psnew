import { ModeToggle } from "@/app/components/mode-toggle";
import { UserNav } from "@/app/components/admin-panel/user-nav";
import { SheetMenu } from "@/app/components/admin-panel/sheet-menu";
import Link from "next/link";
import { PolkadotLogo } from "../icons";
import { SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full backdrop-blur supports-[backdrop-filter]:bg-background/2">
      <div className="mx-4 sm:mx-8 flex h-[var(--header-height)] items-center">
        <div className="flex items-center space-x-4 lg:space-x-0 w-full">
          <SheetMenu />
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300 w-72"
          >
            <PolkadotLogo
              width={30}
              height={30}
              className="animate-polkadot-colors mr-2 shadow-sm"
            />
            <span className="font-bold text hover:underline">
              Polkadot Study
            </span>
            <span className="sr-only">Polkadot Study</span>
          </Link>
          <div className="flex flex-row justify-between w-full !ml-16">
            <nav className="hidden md:flex items-center space-x-6 flex-1">
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
                  className="w-full rounded-md bg-foreground/60 pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--polkadot-purple)] focus:border-primary hidden md:flex"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 justify-end">
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
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
