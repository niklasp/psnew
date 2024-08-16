import { Button } from "../../ui/button";
import { codify } from "../../../lib/utils";
import {
  CheckCheck,
  StarHalfIcon,
  StarIcon,
  StarOff,
  Stars
} from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";

export function TutorialIntro({ tutorial, meta }) {
  return (
    <div className="p-8 rounded-xl bg-polkadot-secondary-100/50 flex flex-col md:flex-row mb-8">
      <div className="w-full md:w-2/3 border-r border-gray-400 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">{meta.title}</h1>
        <p className="flex-1">{meta.description}</p>
        <div className="flex flex-row gap-1 items-center">
          <span className="font-bold mr-2">4.4</span>
          <StarIcon size={20} fill="yellow" />
          <StarIcon size={20} fill="yellow" />
          <StarIcon size={20} fill="yellow" />
          <StarIcon size={20} />
          <StarIcon size={20} />
          <span className="text-xs ml-1">12 ratings</span>
        </div>
        <div className="flex flex-row items-center mt-6">
          <Button className="mr-4">Start Tutorial</Button>
          <p>138 views</p>
        </div>
      </div>
      <div className="pl-8 w-full md:w-1/3">
        <h4 className="text-lg font-bold mb-3">What you will learn</h4>
        <ul>
          {meta.learnings?.map((learning) => (
            <li
              key={learning}
              className="flex flex-row justify-items-start items-start "
            >
              <span className="w-8 mr-2">
                <CheckCheck className="inline" size={16} />
              </span>
              <span dangerouslySetInnerHTML={{ __html: codify(learning) }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
