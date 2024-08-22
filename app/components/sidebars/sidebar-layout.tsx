import { cn } from "@/app/lib/utils";
import { SidebarToggle } from "../admin-panel/sidebar-toggle";

export function SidebarLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 pt-4 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        "mt-[var(--header-height)] w-72"
      )}
    >
      {/* <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <div className="relative h-full flex flex-col px-3 pb-4 overflow-y-auto">
        {children}
      </div>
    </aside>
  );
}
