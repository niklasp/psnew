import AdminPanelLayout from "../components/admin-panel/admin-panel-layout";

export default async function TutorialsLayout({
  children
}: {
  children: React.ReactNode;
  params: any;
}) {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
}
