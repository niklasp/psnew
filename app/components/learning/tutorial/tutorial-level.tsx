import { cn } from "@/app/lib/utils";
import { difficultyType } from "@/app/types";
import { Circle, CircleDot, CircleSlash, Dot } from "lucide-react";

export function TutorialLevel({
  difficulty,
  className,
  size = "default"
}: {
  difficulty: difficultyType;
  className?: string;
  size?: "default" | "lg";
}) {
  const iconSize = size === "default" ? 12 : 24;

  return (
    <div
      className={cn(
        "items-center",
        {
          "flex flex-col text-lg rounded-lg p-4": size === "lg",
          "inline-flex text-sm px-1.5 py-0.5 rounded-md": size === "default"
        },
        {
          "text-green-700 border-green-700 dark:text-green-200 border-2 dark:border-green-200":
            difficulty === "beginner",
          "text-yellow-600 border-yellow-600 dark:text-yellow-200 border-2 dark:border-yellow-200":
            difficulty === "intermediate",
          "text-orange-700 border-orange-700 dark:text-orange-200 border-2 dark:border-orange-200":
            difficulty === "expert"
        },
        className
      )}
    >
      {difficulty === "beginner" && (
        <>
          <span className="flex">
            <CircleSlash size={iconSize} />
            <Circle size={iconSize} />
            <Circle size={iconSize} className="mr-1" />
          </span>
          Beginner
        </>
      )}
      {difficulty === "intermediate" && (
        <>
          <span className="flex">
            <CircleSlash size={iconSize} />
            <CircleSlash size={iconSize} />
            <Circle size={iconSize} className="mr-1" />
          </span>
          Intermediate
        </>
      )}
      {difficulty === "expert" && (
        <>
          {" "}
          <CircleSlash size={iconSize} />
          <CircleSlash size={iconSize} />
          <CircleSlash size={iconSize} className="mr-1" />
          Expert
        </>
      )}
    </div>
  );
}
