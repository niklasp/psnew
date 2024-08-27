import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";
import { generateTutorialToc } from "../lib/generate-tutorial-toc";

export default async function BlogLayout({
  children
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
