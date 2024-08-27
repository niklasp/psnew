import Link from "next/link";
import { cn, toTitleCase } from "@/app/lib/utils";

export function TutorialSyllabus({
  sections,
  tutorial
}: {
  sections: any;
  tutorial: any;
}) {
  return (
    <div className="w-full p-8">
      <h3 className="text-lg font-bold">Syllabus</h3>
      <div className="mb-4 flex gap-2">
        <span>{sections.length} sections</span>
        <span>{4} quizzes</span>
        <span>{8} sections</span>
      </div>
      <ul className="w-2/3 divide-y">
        {sections.map((section: any, index: number) => (
          <li
            key={section.fileName}
            className="rounded-md transition-all duration-300 group"
          >
            <Link
              className="p-4 block"
              href={`/tutorials/${tutorial}/${section.fileName}`}
            >
              <span className="group-hover:border border-polkadot-secondary-200 rounded-full bg-polkadot-secondary w-8 h-8 inline-flex items-center justify-center text-white mr-4">
                {index}
              </span>
              <span className="group-hover:translate-x-1 inline-block transition-transform">
                {section.title ||
                  toTitleCase(section.fileName) ||
                  `Section ${index + 1}`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
