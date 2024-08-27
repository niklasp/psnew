import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import { getTutorialSectionData } from "@/app/lib/get-tutorial-section-data";
import { getTutorialMeta } from "@/app/lib/getTutorialMeta";
import { getTutorialSections } from "@/app/lib/util-path";
import matter from "gray-matter";
import { Breadcrumbs, generateBreadcrumbs } from "@/app/components/Breadcrumbs";

export default async function TutorialSectionPage({ params }) {
  const { tutorial, section } = params;

  const meta = await getTutorialMeta(tutorial);
  const sections = getTutorialSections(tutorial, meta.sections);

  if (!sections) {
    return notFound();
  }

  const currentSectionIndex = sections.findIndex((s) => s.fileName === section);
  if (currentSectionIndex === -1) {
    return notFound();
  }

  const previousSection =
    currentSectionIndex > 0 ? sections[currentSectionIndex - 1] : null;
  const nextSection =
    currentSectionIndex < sections.length - 1
      ? sections[currentSectionIndex + 1]
      : null;

  const { title, content } = await getTutorialSectionData(tutorial, section);
  const { content: parsedContent, data } = matter(content);

  const breadcrumbs = await generateBreadcrumbs({ tutorial, section });

  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={breadcrumbs} />
      <div className="prose dark:prose-invert prose-pink prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white">
        <CustomMDX source={parsedContent} />
        {previousSection && (
          <Link href={`/tutorials/${tutorial}/${previousSection.fileName}`}>
            Previous: {previousSection.title}
          </Link>
        )}
        {nextSection && (
          <Link href={`/tutorials/${tutorial}/${nextSection.fileName}`}>
            Next: {nextSection.title}
          </Link>
        )}
        <Link href={`/tutorials/${tutorial}`}>Back to {meta.title}</Link>
      </div>
    </div>
  );
}
