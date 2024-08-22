import { cn } from "@/app/lib/utils";
import { CheckIcon, CircleIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";

const milestones = [
  {
    title: "Phase 1: Foundation",
    description: "Establish core infrastructure and initial tutorials",
    status: "completed"
  },
  {
    title: "Phase 2: Migration & Extension",
    description: "Grow tutorial library and enhance user experience",
    status: "active",
    items: [
      "Migrate from docusaurus to modern stack",
      "Collaborations for more tutorials"
    ]
  },
  {
    title: "Phase 3: Growth",
    description: "UX = DX",
    status: "future",
    items: [
      "Improve user experience (learning progress)",
      "Advanced content creation (live editor)"
    ]
  },
  {
    title: "Phase 4: Community",
    description: "Foster community engagement and advanced content creation",
    status: "future",
    items: ["Community engagement", "Advanced content creation"]
  }
];

export function RoadMap() {
  return (
    <section id="roadmap" className="max-w-3xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Polkadot.Study Roadmap
      </h2>
      <div className="relative">
        {milestones.map((milestone, index) => (
          <div key={index} className="mb-12 flex items-center">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {milestone.status === "completed" ? (
                <CheckIcon className="w-8 h-8 text-polkadot-quaternary" />
              ) : milestone.status === "active" ? (
                <div className="relative animate-pulse">
                  <CircleIcon className="w-8 h-8 text-polkadot-primary" />
                  <DotFilledIcon className="w-6 h-6 text-polkadot-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              ) : (
                <div className="relative">
                  <CircleIcon className="w-8 h-8 text-gray-300" />
                  <DotFilledIcon className="w-6 h-6 text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              )}
            </div>
            <div className="ml-4 flex-grow">
              <h3
                className={cn(
                  "text-xl font-semibold",
                  milestone.status === "future"
                    ? "text-gray-400"
                    : "text-polkadot-secondary"
                )}
              >
                {milestone.title}
              </h3>
              <p
                className={cn(
                  "italic",
                  milestone.status === "future"
                    ? "text-gray-400"
                    : "text-gray-600 dark:text-gray-300"
                )}
              >
                {milestone.description}
              </p>
              {milestone.items && (
                <ul
                  className={cn(
                    "mt-2 ml-4 list-disc text-gray-600 dark:text-gray-300",
                    milestone.status === "future"
                      ? "text-gray-400"
                      : "text-gray-600 dark:text-gray-300"
                  )}
                >
                  {milestone.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        <div className="absolute left-[1.45rem] top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-700 -z-10 after:absolute after:top-0 after:h-[50px] after:w-0.5 after:animate-slide-down after:bg-gradient-to-b after:from-gray-100 after:via-gray-200 after:to-gray-100 dark:after:from-gray-700 dark:after:via-black dark:after:to-gray-700" />
      </div>
      <div className="mt-8 text-center">
        <Link
          href="https://github.com/PolkadotStudy/polkadot.study/milestones"
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <Button withArrow>View detailed Milestones on GitHub</Button>
        </Link>
      </div>
    </section>
  );
}
