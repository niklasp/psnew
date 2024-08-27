import React from "react";
import generateAuthorsToc from "../../../lib/generate-authors-toc";
import { SidebarLayout } from "@/app/components/sidebars/sidebar-layout";

export default async function AuthorsSidebar() {
  const authorsToc = await generateAuthorsToc();

  return (
    <SidebarLayout>
      AuthorsSidebar
      <pre className="text-xs">{JSON.stringify(authorsToc, null, 2)}</pre>
    </SidebarLayout>
  );
}
