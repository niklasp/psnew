import { cn } from "@/app/lib/utils";
import { Clock, Tag, TagIcon } from "lucide-react";
import Link from "next/link";
import { TutorialLevel } from "../tutorial-level";

export default function TutorialCard({
  tutorial,
  meta,
  minimal
}: {
  tutorial: string;
  meta: any;
  minimal?: boolean;
}) {
  return (
    <div
      className={cn(
        "group cursor-pointer rounded-3xl px-6 pt-6 pb-12 overflow-visible bg-white h-full flex flex-col text-ellipsis dark:bg-slate-800 dark:text-white",
        "relative transition-all duration-300 border-2 border-[var(--polkadot-purple)]",
        "after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-[var(--polkadot-purple)] after:z-[-1] after:rounded-3xl hover:after:translate-x-[10px] hover:after:translate-y-[10px] after:transition-all after:duration-300",
        { "min-h-[360px]": !minimal }
      )}
    >
      <Link
        href={`/tutorials/${tutorial}`}
        className="inset-0 absolute rounded-3xl z-[0]"
      />
      <div className="flex flex-col h-full items-start">
        {meta.level && (
          <TutorialLevel
            difficulty={meta.level}
            className="px-1.5 py-0.5 rounded-md mb-3 inline-flex"
          />
        )}
        <h2 className="text-[26px] leading-[28px] mb-3 font-bold">
          {meta.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3 flex-1">
          {meta.description}
        </p>
        {!minimal && (
          <div className="text-gray-600 dark:text-gray-300 flex gap-1 flex-col items-start">
            {meta.tags && (
              <p className="z-10 mb-2">
                {meta.tags.map((tag) => (
                  <Link
                    href="#"
                    key={tag}
                    className="mr-2 inline-flex items-center hover:dark:text-purple-200 hover:text-[var(--polkadot-purple)] transition-colors"
                  >
                    <Tag width={14} height={14} className="mr-1" />
                    {tag}
                  </Link>
                ))}
              </p>
            )}
            <div className="flex justify-between w-full">
              {meta.duration && (
                <p className="inline-flex items-center">
                  <Clock width={14} height={14} className="mr-1" />{" "}
                  {meta.duration}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 right-[-2px] bg-[var(--polkadot-purple)] text-white rounded-tl-md pr-4 pl-3 py-1 rounded-br-3xl group-hover:translate-x-1 group-hover:translate-y-1 duration-300 transition-all">
          {meta.category}
        </div>
      </div>
    </div>
  );
}
