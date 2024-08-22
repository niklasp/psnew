import path from "path";
import fs from "fs";
import { toTitleCase } from "./utils";

export const getTutorialPath = (tutorial?: string): string =>
  path.join(process.cwd(), "content", "tutorials", tutorial || "");

export const tutorialDirs: string[] = fs
  .readdirSync(getTutorialPath())
  .filter((dir) =>
    fs.lstatSync(path.join(getTutorialPath(), dir)).isDirectory()
  );

interface Section {
  fileName: string;
  title: string;
}

export const getTutorialSections = (
  tutorial: string,
  sections?: Section[]
): Section[] => {
  const tutorialPath = getTutorialPath(tutorial);
  const allFiles = fs
    .readdirSync(tutorialPath)
    .filter((file) => file.endsWith(".mdx"));

  return allFiles.map((fileName) => {
    const fileBaseName = fileName.replace(".mdx", "");
    const sectionMeta = sections?.find(
      (section) => section.fileName === fileBaseName
    );
    return {
      fileName: fileBaseName,
      title: sectionMeta ? sectionMeta.title : toTitleCase(fileBaseName)
    };
  });
};
