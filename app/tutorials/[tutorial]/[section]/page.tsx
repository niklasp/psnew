import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import Link from "next/link";
import TOC from "@/app/components/toc";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import { toTitleCase } from "../../../lib/utils";
import AdminPanelLayout from "@/app/components/admin-panel/admin-panel-layout";
import { Sidebar } from "@/app/components/sidebars/sidebar";

export default async function TutorialSectionPage({ params }) {
  const { tutorial, section } = params;

  const tutorialPath = path.join(
    process.cwd(),
    "content",
    "tutorials",
    tutorial
  );
  const filePath = path.join(tutorialPath, `${section}.mdx`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  // Attempt to load the meta.ts file for the current tutorial
  let currentMeta;
  try {
    currentMeta = (await import(`@/tutorials/${tutorial}/meta`)).meta;
  } catch (error) {
    console.warn(
      `Warning: meta.ts not found for tutorial "${tutorial}". Using default metadata.`
    );
    currentMeta = {
      title: toTitleCase(tutorial),
      category: "Uncategorized",
      sections: []
    };
  }

  const { sections, category } = currentMeta;

  // Load all tutorials to find other tutorials in the same category
  const tutorialsDirectory = path.join(process.cwd(), "content", "tutorials");
  const tutorialDirs = fs
    .readdirSync(tutorialsDirectory)
    .filter((dir) =>
      fs.lstatSync(path.join(tutorialsDirectory, dir)).isDirectory()
    );

  const otherTutorials = await Promise.all(
    tutorialDirs.map(async (tut) => {
      try {
        const { meta } = await import(`@/tutorials/${tut}/meta`);
        return { tutorial: tut, meta };
      } catch (error) {
        console.warn(
          `Warning: meta.ts not found for tutorial "${tut}". Skipping this tutorial.`
        );
        return null;
      }
    })
  );

  const filteredOtherTutorials = otherTutorials.filter(
    (tut) => tut && tut.meta.category === category && tut.tutorial !== tutorial
  );

  const sectionMeta = sections?.find((s) => s.fileName === section);
  const title = sectionMeta ? sectionMeta.title : toTitleCase(section);

  const sectionIndex = sections?.findIndex((s) => s.fileName === section);
  const nextSection = sections?.[sectionIndex + 1];
  const previousSection = sections?.[sectionIndex - 1];

  return (
    <div className="prose dark:prose-invert prose-pink prose-headings:mt-8 prose-headings:font-semibold prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg dark:prose-headings:text-white mx-auto">
      <h1>{title}</h1>
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
      <pre>{JSON.stringify(sections)}</pre>
      <CustomMDX source={fs.readFileSync(filePath, "utf8")} />
      <Link href={`/tutorials/${tutorial}`}>Back to {currentMeta.title}</Link>
    </div>
  );
}
