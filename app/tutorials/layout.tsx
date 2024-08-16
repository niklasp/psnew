import AdminPanelLayout from "@/app/components/admin-panel/admin-panel-layout";

export default function DemoLayout({
  children,
  sidebar
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  console.log("aaa sidebar", sidebar);

  return (
    <AdminPanelLayout sidebarElement={sidebar}>{children}</AdminPanelLayout>
  );
}
