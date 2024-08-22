import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";
import { BlogSidebar } from "../components/sidebars/blog-sidebar";
import { Sidebar } from "../components/sidebars/sidebar";
import { TutorialsSidebar } from "../components/sidebars/tutorials-sidebar";
import { generateTutorialToc } from "../lib/generate-tutorial-toc";

export default async function TutorialsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const tutorialsToc = await generateTutorialToc();

  return (
    <AdminPanelLayout
      sidebarElement={<TutorialsSidebar tutorialsToc={tutorialsToc} />}
    >
      {children}
    </AdminPanelLayout>
  );
}
