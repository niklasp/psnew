"use client";

import { cn } from "@/app/lib/utils";
import { useStore } from "@/app/hooks/use-store";
import { Button } from "@/app/components/ui/button";
import { Menu } from "@/app/components/admin-panel/menu";
import { useSidebarToggle } from "@/app/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/app/components/admin-panel/sidebar-toggle";
import { PolkadotLogo } from "../icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/app/components/ui/collapsible";

export default function TutorialOverviewSidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White" },
        { value: "beige", label: "Beige" },
        { value: "blue", label: "Blue" },
        { value: "brown", label: "Brown" },
        { value: "green", label: "Green" },
        { value: "purple", label: "Purple" }
      ]
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "All New Arrivals" },
        { value: "tees", label: "Tees" },
        { value: "crewnecks", label: "Crewnecks" },
        { value: "sweatshirts", label: "Sweatshirts" },
        { value: "pants-shorts", label: "Pants & Shorts" }
      ]
    },
    {
      id: "sizes",
      name: "Sizes",
      options: [
        { value: "xs", label: "XS" },
        { value: "s", label: "S" },
        { value: "m", label: "M" },
        { value: "l", label: "L" },
        { value: "xl", label: "XL" },
        { value: "2xl", label: "2XL" }
      ]
    }
  ];

  return null;
}
