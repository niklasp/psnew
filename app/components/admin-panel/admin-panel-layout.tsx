import { cn } from "@/app/lib/utils";
import { Footer } from "@/app/components/admin-panel/footer";

export default async function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] transition-[margin-left] ease-in-out duration-300",
          "lg:ml-72"
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
