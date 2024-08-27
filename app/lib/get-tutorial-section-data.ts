import fs from "fs";
import path from "path";
import { getTutorialPath } from "./util-path";
import { getTutorialMeta } from "./getTutorialMeta";
import { toTitleCase } from "./utils";

export async function getTutorialSectionData(
  tutorial: string,
  section: string
) {
  const tutorialPath = getTutorialPath(tutorial);
  const filePath = path.join(tutorialPath, `${section}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const currentMeta = await getTutorialMeta(tutorial);
  const { category } = currentMeta;

  // Read all MDX files in the tutorial directory
  const files = fs
    .readdirSync(tutorialPath)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => {
      const aNum = parseInt(a.split("-")[0]);
      const bNum = parseInt(b.split("-")[0]);
      return aNum - bNum;
    });

  // Create a complete sections array
  const allSections = files.map((file) => {
    const fileName = file.replace(".mdx", "");
    const metaSection = currentMeta.sections.find(
      (s) => s.fileName === fileName
    );
    return {
      fileName,
      title: metaSection
        ? metaSection.title
        : toTitleCase(fileName.replace(/^\d+-/, "").replace(/-/g, " "))
    };
  });

  const tutorialsDirectory = getTutorialPath();
  const tutorialDirs = fs
    .readdirSync(tutorialsDirectory)
    .filter((dir) =>
      fs.lstatSync(path.join(tutorialsDirectory, dir)).isDirectory()
    );

  const otherTutorials = await Promise.all(
    tutorialDirs.map(async (tut) => {
      try {
        const meta = await getTutorialMeta(tut);
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

  const sectionIndex = allSections.findIndex((s) => s.fileName === section);
  const currentSection = allSections[sectionIndex];
  const title = currentSection ? currentSection.title : toTitleCase(section);

  const nextSection =
    sectionIndex < allSections.length - 1
      ? allSections[sectionIndex + 1]
      : null;
  const previousSection =
    sectionIndex > 0 ? allSections[sectionIndex - 1] : null;

  const content = fs.readFileSync(filePath, "utf8");

  return {
    title,
    content,
    currentMeta,
    filteredOtherTutorials,
    nextSection,
    previousSection,
    allSections
  };
}
