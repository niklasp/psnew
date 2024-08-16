import { cn } from "@/app/lib/utils";
import { Circle, CircleDot, CircleSlash, Dot } from "lucide-react";

export type difficultyType = "beginner" | "intermediate" | "expert";

export function TutorialLevel({
  difficulty,
  className
}: {
  difficulty: difficultyType;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-sm",
        {
          "text-green-700 border-green-700 dark:text-green-200 border-2 dark:border-green-200":
            difficulty === "beginner",
          "text-yellow-500 border-yellow-500 dark:text-yellow-200 border-2 dark:border-yellow-200":
            difficulty === "intermediate",
          "text-orange-700 border-orange-700 dark:text-orange-200 border-2 dark:border-orange-200":
            difficulty === "expert"
        },
        className
      )}
    >
      {difficulty === "beginner" && (
        <>
          <CircleSlash size={12} />
          <Circle size={12} />
          <Circle size={12} className="mr-1" />
          Beginner
        </>
      )}
      {difficulty === "intermediate" && (
        <>
          {" "}
          <CircleSlash size={12} />
          <CircleSlash size={12} />
          <Circle size={12} className="mr-1" />
          Intermediate
        </>
      )}
      {difficulty === "expert" && (
        <>
          {" "}
          <CircleSlash size={12} />
          <CircleSlash size={12} />
          <CircleSlash size={12} className="mr-1" />
          Expert
        </>
      )}
    </span>
  );
}
