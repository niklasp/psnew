import Link from "next/link";
import { GraduationCap, NotebookPen, PenLineIcon } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { RoadMap } from "./components/home/roadmap";
import { TutorialGrid } from "./components/learning/tutorial-grid";
import { PointerTrackingSection } from "./components/3d/pointer-tracking-section";
import { getTutorials } from "./lib/get-tutorials";
import Dots from "./components/3d/dots";
import { DotsBackground } from "./components/3d/dots-background";

export default async function HomePage() {
  const tutorials = await getTutorials();
  const latestTutorials = tutorials.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-blob" />
      <main className="min-h-screen flex-1 ">
        <PointerTrackingSection
          scene={<Dots pointerPos={{ x: 0, y: 0 }} />}
          className="pb-16 sm:pb-20 -mt-[var(--header-height)] min-h-screen"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-screen">
            <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-32 min-h-screen flex items-center flex-col justify-center">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-700 dark:text-gray-400 ring-1 ring-black/10 hover:ring-black/20 dark:ring-white/10 dark:hover:ring-white/20 bg-background">
                  Support our next round of funding.{" "}
                  <a href="#" className="font-semibold dark:text-white ml-2">
                    <span aria-hidden="true" className="absolute inset-0" />
                    Polkassembly <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-6xl inline-flex items-center">
                  Learn to Build the Future of Blockchains{" "}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                  Developer-Created Guides to Mastering Polkadot SDK for
                  <br />
                  Polkadot Blockchains and DApps
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link href="/tutorials" className="h-20">
                    <Button withArrow size="lg">
                      <GraduationCap
                        strokeWidth={1}
                        size={18}
                        className="mr-2"
                      />
                      View Tutorials
                    </Button>
                  </Link>
                  <Link href="/tutorials" className="h-20">
                    <Button variant="outline" size="lg">
                      <PenLineIcon strokeWidth={1} size={18} className="mr-2" />{" "}
                      Become an Author
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </PointerTrackingSection>
        <section id="tutorials" className="mb-16">
          <div className="max-w-3xl mx-auto p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Latest Tutorials
            </h2>
            <p>
              Learn how to navigate the polkadot ecosystem as a developer in our
              step-by-step tutorials. All tutorials are written by developers
              from the polkadot community. Start your polkadot developer journey
              here.
            </p>
          </div>
          <TutorialGrid
            tutorials={latestTutorials}
            className="mx-[3rem] my-6"
          />
          <div className="mx-[3rem] my-6 text-right">
            <Link href="/tutorials">
              <Button size="lg" withArrow className="self-center">
                View all tutorials
              </Button>
            </Link>
          </div>
        </section>

        <PointerTrackingSection
          scene={<DotsBackground pointerPos={{ x: 0, y: 0 }} />}
          className="border-t border-b shadow-inset mb-16"
        >
          <section id="about-participate" className="relative overflow-hidden">
            <div className="relative z-10">
              <div className="p-8 lg:p-16 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                      <h2 className="text-3xl md:text-6xl font-bold mb-6 text-center lg:text-left flex items-center justify-center lg:justify-start">
                        Participate
                        <NotebookPen className="inline-flex ml-2 w-8 h-8 md:w-12 md:h-12" />
                      </h2>
                    </div>
                    <div className="backdrop-blur-[3px] p-12 rounded-xl shadow-xl border bg-background/20">
                      <p className="mb-4">
                        Are you a developer with insights to share about
                        Polkadot? Join our community of contributors!
                      </p>
                      <p className="mb-4">
                        Our platform&apos;s code, tutorials, and documentation
                        are{" "}
                        <Link
                          href=""
                          className="text-polkadot-secondary hover:underline"
                        >
                          open-sourced on GitHub
                        </Link>
                        . Submit new content easily through Pull Requests.
                      </p>
                      <p className="mb-4">
                        You can even receive funding for your work by submitting
                        a referendum to the Kusama or Polkadot treasury.
                      </p>
                      <p className="mb-6">
                        Getting started is simple: fork the repository, add your
                        tutorial, and await approval.
                      </p>
                      <div className="text-center lg:text-left">
                        <Button
                          withArrow
                          variant="default"
                          className="self-center"
                        >
                          Learn how to contribute
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </PointerTrackingSection>

        <section id="about-roadmap" className="mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="rounded-lg p-8">
                  <h2 className="text-3xl font-bold mb-6 text-center">
                    Tutorials by the community for the community
                  </h2>
                  <p className="mb-4">
                    Polkadot.study is an open educational platform for
                    developers by developers, aiming to provide high-quality
                    content through tutorials, videos, and interactive learning
                    exercises.
                  </p>
                  <p className="mb-4">
                    We offer a well-organized infrastructure for submitting and
                    accessing tutorials, documentation, and repositories
                    relevant to the Polkadot ecosystem.
                  </p>
                  <p>
                    Funded by the Kusama treasury in March 2023, our platform is
                    open to all skill levels and welcomes contributions from a
                    diverse range of authors.
                  </p>
                </div>
              </div>

              <RoadMap />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
