import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";
import { BlogSidebar } from "../components/sidebars/blog-sidebar";
import { Sidebar } from "../components/sidebars/sidebar";
import generateBlogToc from "../lib/generate-blog-toc";

export default async function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const blogToc = await generateBlogToc();

  return (
    <AdminPanelLayout
      sidebarElement={<BlogSidebar blogToc={blogToc} isOpen={false} />}
    >
      {children}
    </AdminPanelLayout>
  );
}
