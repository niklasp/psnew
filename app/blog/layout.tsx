import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";

export default async function BlogLayout({
  children
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
