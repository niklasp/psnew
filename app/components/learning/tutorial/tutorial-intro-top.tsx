import { Button } from "../../ui/button";
import { codify } from "../../../lib/utils";
import {
  BookType,
  Brain,
  CheckCheck,
  StarHalfIcon,
  StarIcon,
  StarOff,
  Stars
} from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { TutorialLevel } from "../tutorial-level";
import Link from "next/link";

export function TutorialIntroTop({
  tutorial,
  meta
}: {
  tutorial: string;
  meta: any;
}) {
  return (
    <div className="max-w-5xl p-8 rounded-xl border-polkadot-secondary-500 border-2 flex flex-col md:flex-row mb-8 shadow-lg mt-12 z-10">
      <div className="w-full md:w-3/5 flex flex-col items-start">
        <h1 className="text-4xl font-bold mb-6">{meta.title}</h1>
        <p className="flex-1">{meta.description}</p>
        <div className="flex flex-row gap-1 items-center">
          <span className="font-bold mr-2">4.4</span>
          <StarIcon
            size={20}
            className="fill-yellow-200 dark:fill-yellow-500/90"
          />
          <StarIcon
            size={20}
            className="fill-yellow-200 dark:fill-yellow-500/90"
          />
          <StarIcon
            size={20}
            className="fill-yellow-200 dark:fill-yellow-500/90"
          />
          <StarIcon size={20} />
          <StarIcon size={20} />
          <span className="text-xs ml-1">12 ratings</span>
        </div>
        <div className="flex flex-row items-center mt-6">
          <Link href={`/tutorials/${tutorial}/${meta.sections[0].fileName}`}>
            <Button className="mr-4">
              <BookType strokeWidth={1.5} className="mr-2" size={20} /> Start
              Tutorial
            </Button>
          </Link>
          <p>138 views</p>
        </div>
      </div>
      <div className="pl-8 w-full md:w-2/5">
        <h4 className="text-lg font-bold mb-3">What you will learn</h4>
        <ul>
          {meta.learnings?.map((learning: string) => (
            <li
              key={learning}
              className="flex flex-row justify-items-start items-start "
            >
              <span className="w-8 mr-2">
                <Brain className="inline" size={16} />
              </span>
              <span dangerouslySetInnerHTML={{ __html: codify(learning) }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
