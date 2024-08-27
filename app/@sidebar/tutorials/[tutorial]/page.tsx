import { SidebarLayout } from "@/app/components/sidebars/sidebar-layout";
import { getTutorialSections } from "@/app/lib/util-path";

export default async function TutorialSidebar({
  params
}: {
  params: { tutorial: string };
}) {
  const { tutorial } = params;
  const sections = getTutorialSections(tutorial);

  return (
    <SidebarLayout>
      TutorialSidebar
      <pre className="text-xs">{JSON.stringify(sections, null, 2)}</pre>
    </SidebarLayout>
  );
}
