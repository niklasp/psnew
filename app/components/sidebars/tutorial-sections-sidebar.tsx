import Link from "next/link";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { SidebarLayout } from "./sidebar-layout";
import { TutorialSection } from "@/app/lib/generate-tutorial-toc";

interface TutorialSectionsSidebarProps {
  tutorialSections: TutorialSection[];
  currentTutorial: string;
}

export function TutorialSectionsSidebar({
  tutorialSections,
  currentTutorial
}: TutorialSectionsSidebarProps) {
  return (
    <SidebarLayout>
      <ScrollArea className="[&>div>div[style]]:!block">
        <nav className="h-full w-full">
          <h3 className="font-semibold mb-2 px-4">Tutorial Sections</h3>
          <ul className="space-y-1 px-2">
            {tutorialSections.map((section, index) => (
              <li key={index}>
                <Link
                  href={`/tutorials/${currentTutorial}/${section.fileName}`}
                  className="block px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
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
