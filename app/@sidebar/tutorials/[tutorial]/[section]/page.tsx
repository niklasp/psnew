import { SidebarLayout } from "@/app/components/sidebars/sidebar-layout";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import {
  getTutorial,
  getTutorialSections,
  getTutorialToc
} from "@/app/lib/generate-tutorial-toc";
import { getTutorialMeta } from "@/app/lib/getTutorialMeta";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

interface SectionSidebarProps {
  params: {
    tutorial: string;
    section: string;
  };
}

export default async function SectionSidebar({ params }: SectionSidebarProps) {
  const { tutorial, section: currentSection } = params;
  const tutorialData = await getTutorial(tutorial);
  const sections = await getTutorialSections(tutorial);

  return (
    <SidebarLayout>
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="h-full w-full">
          <h3 className="font-semibold mb-2 px-4">
            {tutorialData?.meta?.title}
          </h3>
          <ul className="space-y-1 px-2">
            {sections.map((section, index) => (
              <li key={index}>
                <Link
                  key={section.url}
                  href={`${section.url}`}
                  className={cn(
                    "block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded",
                    section.url === currentSection &&
                      "bg-gray-200 dark:bg-gray-700 font-semibold"
                  )}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </SidebarLayout>
  );
}
