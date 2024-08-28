import React from "react";
import { cn } from "@/app/lib/utils";
import { CalendarClock } from "lucide-react";

export function TutorialUpdated({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div
      className={cn(
        "items-center inline-flex text-sm px-1.5 py-0.5 rounded-md mb-3",
        "text-gray-700 border-gray-700 dark:text-gray-200 border-2 dark:border-gray-200"
      )}
    >
      <span className="flex items-center">
        <CalendarClock className="mr-1" size={14} />
        {new Date(lastUpdated).toLocaleDateString()}
      </span>
    </div>
  );
}
