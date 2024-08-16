import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toTitleCase } from "@/app/lib/utils";
import Image from "next/image";
import { TutorialIntro } from "@/app/components/learning/tutorial/tutorial-intro";
import { get } from "http";
import { getTutorialMeta } from "@/app/lib/getTutorialMeta";
import { TutorialSyllabus } from "@/app/components/learning/tutorial/tutorial-syllabus";

export default async function TutorialOverviewPage({ params }) {
  const { tutorial } = params;
  const tutorialPath = path.join(process.cwd(), "tutorials", tutorial);

  // Check if the tutorial directory exists
  if (!fs.existsSync(tutorialPath)) {
    return notFound();
  }

  const files = fs
    .readdirSync(tutorialPath)
    .filter((file) => file.endsWith(".mdx"));
  const sections = files.map((file) => ({
    name: file
      .replace(/\.mdx$/, "")
      .replace(/^\d+-/, "")
      .replace(/-/g, " "),
    fileName: file.replace(/\.mdx$/, "")
  }));

  const meta = await getTutorialMeta(tutorial);

  return (
    <div className="px-8 py-4 overflow-hidden">
      <TutorialIntro tutorial={tutorial} meta={meta} />
      <TutorialSyllabus sections={sections} tutorial={tutorial} />

      <Link href={`/tutorials/${tutorial}/${sections[0]?.fileName}`}>
        <button>Begin Tutorial</button>
      </Link>
      <div className="w-2/3 relative h-[500px]">
        <Image alt="course1" src="/course1.png" fill={true} />
      </div>
      <div className="w-2/3 relative h-[500px]">
        <Image alt="course2" src="/course2.png" fill={true} />
      </div>
    </div>
  );
}
