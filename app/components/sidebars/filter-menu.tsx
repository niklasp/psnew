"use client";

import Link from "next/link";
import {
  CheckIcon,
  Circle,
  Ellipsis,
  LogOut,
  Square,
  SquareCheck
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";
import { getMenuList } from "@/app/lib/menu-list";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { CollapseMenuButton } from "@/app/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/app/components/ui/tooltip";
import { filters } from "@/app/lib/config";
import { useApp } from "@/app/providers/app-provider";
import { Toggle } from "@/app/components/ui/toggle";
import { FontBoldIcon } from "@radix-ui/react-icons";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function FilterMenu({ isOpen }: MenuProps) {
  const { filters: activeFilters, setFilters } = useApp();
  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {filters.map(({ label, key, options }, index) => (
            <li
              className={cn("w-full flex flex-col gap-1", label ? "pt-5" : "")}
              key={index}
            >
              {(isOpen && label) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {label}
                </p>
              ) : !isOpen && isOpen !== undefined && label ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {options.map((opt, idx) => (
                <Toggle
                  key={`${opt}{idx}`}
                  className="w-auto self-start ml-4"
                  aria-label="Toggle italic"
                  pressed={activeFilters[key].includes(opt)}
                  onPressedChange={(e) =>
                    e
                      ? setFilters({
                          ...activeFilters,
                          [key]: [...activeFilters[key], opt]
                        })
                      : setFilters({
                          ...activeFilters,
                          [key]: activeFilters[key].filter(
                            (filter) => filter !== opt
                          )
                        })
                  }
                >
                  {activeFilters[key].includes(opt) ? (
                    <SquareCheck size="18" className="mr-2" />
                  ) : (
                    <Square size="18" className="mr-2" />
                  )}
                  {opt}
                </Toggle>
              ))}
            </li>
          ))}
          <li className="w-full grow flex items-end">
            {/* <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant="outline"
                    className="w-full justify-center h-10 mt-5"
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider> */}
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
