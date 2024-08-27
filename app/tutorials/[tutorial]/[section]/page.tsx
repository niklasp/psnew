import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import {
  getTutorialToc,
  getTutorial,
  getTutorialSections
} from "@/app/lib/generate-tutorial-toc";
import matter from "gray-matter";
import { Breadcrumbs, generateBreadcrumbs } from "@/app/components/Breadcrumbs";
import fs from "fs";
import path from "path";

export default async function TutorialSectionPage({ params }) {
  const { tutorial, section } = params;

  const tutorialData = await getTutorial(tutorial);
  if (!tutorialData) {
    return notFound();
  }

  const sections = await getTutorialSections(tutorial);
  const currentSection = sections.find((s) => s.url.endsWith(section));
  if (!currentSection) {
    return notFound();
  }

  const currentSectionIndex = sections.findIndex((s) =>
    s.url.endsWith(section)
  );
  const previousSection =
    currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < sections.length - 1
      ? sections[currentSectionIndex + 1]
      : null;

  const filePath = path.join(
    process.cwd(),
    "content",
    "tutorials",
    tutorial,
    `${section}.mdx`
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content: parsedContent, data } = matter(fileContent);

  const breadcrumbs = await generateBreadcrumbs({ tutorial, section });

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={breadcrumbs} />
      <div className="prose dark:prose-invert prose-pink prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
        <CustomMDX source={parsedContent} />
        {previousSection && (
          <Link href={previousSection.url}>
            Previous: {previousSection.title}
          </Link>
        )}
        {nextSection && (
          <Link href={nextSection.url}>Next: {nextSection.title}</Link>
        )}
        <Link href={`/tutorials/${tutorial}`}>
          Back to {tutorialData.meta.title}
        </Link>
      </div>
    </div>
  );
}
