import React from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { getTutorialToc } from "../lib/generate-tutorial-toc";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "./ui/breadcrumb";
import { Home, HomeIcon } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem key={item.href}>
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {index !== items.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export async function generateBreadcrumbs(params: {
  tutorial?: string;
  section?: string;
  slug?: string;
}): Promise<BreadcrumbItem[]> {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Tutorials", href: "/tutorials" }
  ];

  if (params.tutorial) {
    const tutorialToc = await getTutorialToc();

    const tutorial = tutorialToc.find((t) => t.path.endsWith(params.tutorial!));

    if (tutorial) {
      breadcrumbs.push({
        label: tutorial.meta?.title,
        href: `/tutorials/${params.tutorial}`
      });

      if (params.section) {
        const section = tutorial.sections.find((s) =>
          s.url.endsWith(params.section!)
        );
        if (section) {
          breadcrumbs.push({
            label: section.title,
            href: `/tutorials/${params.tutorial}/${params.section}`
          });
        }
      }
    }
  } else if (params.slug) {
    breadcrumbs.push({ label: "Blog", href: "/blog" });
    // You might want to fetch the blog post title here if available
    breadcrumbs.push({ label: params.slug, href: `/blog/${params.slug}` });
  }

  return breadcrumbs;
}

export { Breadcrumbs };
