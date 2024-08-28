import { codify } from "../../../lib/utils";
import {
  CheckCheck,
  Clock,
  MessageCircleCode,
  Monitor,
  Puzzle,
  ScrollText
} from "lucide-react";
import { GitHubLogoIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { TutorialLevel } from "./tutorial-level";
import { TutorialTOCItem } from "@/app/lib/generate-tutorial-toc";
import { difficultyType } from "@/app/types";

interface TutorialIntroBottomProps {
  tutorial: string;
  meta: {
    prerequisites?: string[];
    level: difficultyType;
    duration: string;
    sections: TutorialTOCItem[];
  };
}

export function TutorialIntroBottom({
  tutorial,
  meta
}: TutorialIntroBottomProps) {
  return (
    <div className="max-w-5xl p-8 rounded-xl border-polkadot-secondary-500 border-2 flex flex-col md:flex-row mb-8 shadow-lg mt-12 z-10">
      <div className="w-full md:w-1/4">
        <h4 className="text-lg font-bold mb-3">This course includes</h4>
        <ul>
          <li>
            <Puzzle className="mr-2 inline" size="16" /> 4 Quizzes
          </li>
          <li>
            <MessageCircleCode className="mr-2 inline" size="16" /> 3
            Interactive Code Challenges
          </li>
          <li>
            <GitHubLogoIcon className="mr-2 inline" />
            GitHub Repository
          </li>
          <li>
            <Monitor className="mr-2 inline" size="16" /> Live Demo
          </li>
          <li>
            <ScrollText className="mr-2 inline" size="16" /> Certificate of
            Completion
          </li>
        </ul>
      </div>
      <div className="pl-8 w-full md:w-1/4">
        <h4 className="text-lg font-bold mb-3">Skill Level</h4>
        <TutorialLevel size="lg" difficulty={meta.level} className="mb-3" />
      </div>
      <div className="pl-8 w-full md:w-1/4">
        <h4 className="text-lg font-bold mb-3">Duration</h4>
        {meta.duration && (
          <p className="inline-flex items-center">
            <Clock width={14} height={14} className="mr-1" /> {meta.duration}
          </p>
        )}
      </div>
      <div className="pl-8 w-full md:w-1/4">
        <h4 className="text-lg font-bold mb-3">Prerequisites</h4>
        <ul>
          {meta.prerequisites?.map((req) => (
            <li
              key={req}
              className="flex flex-row justify-items-start items-start "
            >
              <span className="w-8 mr-2">
                <CheckCheck className="inline" size={16} />
              </span>
              <span dangerouslySetInnerHTML={{ __html: codify(req) }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
