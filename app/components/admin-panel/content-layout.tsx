import { Navbar } from "@/app/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <div className="container pt-6 pb-8 px-4 sm:px-4">{children}</div>
    </div>
  );
}
