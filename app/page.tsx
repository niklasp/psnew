import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  PanelsTopLeft,
  PenIcon,
  PenLineIcon
} from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/app/components/ui/button";
import { ModeToggle } from "@/app/components/mode-toggle";
import { ColorDotsStacked } from "./components/graphics/color-dots-stacked";
import { Graduate } from "next/font/google";
import { RoadMap } from "./components/home/roadmap";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="fixed inset-0 w-full h-[100vh] overflow-hidden">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <main className="min-h-screen flex-1 ">
        <div className="relative isolate  pb-16 sm:pb-20 -mt-[var(--header-height)] min-h-screen overflow-hidden">
          {/* <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div> */}
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-32">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-700 dark:text-gray-400 ring-1 ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20">
                  Announcing our next round of funding.{" "}
                  <a href="#" className="font-semibold dark:text-white ml-2">
                    <span aria-hidden="true" className="absolute inset-0" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="mix-blend-difference text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl inline-flex items-center">
                  Learn to Build the Future of Blockchains{" "}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                  Developer-Created Guides to Mastering Polkadot SDK for
                  <br />
                  Polkadot Blockchains and DApps
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/tutorials">
                    <Button className="group" size="lg">
                      <GraduationCap
                        strokeWidth={1}
                        size={18}
                        className="mr-2"
                      />
                      View Tutorials
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    <PenLineIcon strokeWidth={1} size={18} className="mr-2" />{" "}
                    Become an Author
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RoadMap />
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built on top of{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/salimi-my/shadcn-ui-sidebar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
