import Link from "next/link";
import { cn, toTitleCase } from "@/app/lib/utils";

export function TutorialSyllabus({ sections, tutorial }) {
  return (
    <div className="w-full p-8">
      <h3 className="text-lg font-bold">Syllabus</h3>
      <p className="mb-4">{sections.length} sections</p>
      <ul className="w-2/3">
        {sections.map((section, index) => (
          <li
            key={section.fileName}
            className={cn("py-4", {
              "border-b": index !== sections.length - 1
            })}
          >
            <Link href={`/tutorials/${tutorial}/${section.fileName}`}>
              <span className="rounded-full bg-polkadot-secondary w-8 h-8 inline-flex items-center justify-center text-white mr-2">
                {index}
              </span>
              {toTitleCase(section.name)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
