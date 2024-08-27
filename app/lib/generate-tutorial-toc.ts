import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getTutorialMeta } from "./getTutorialMeta";
import { cache } from "react";

export interface TutorialTOCItem {
  title: string;
  url: string;
  depth: number;
  meta?: Record<string, any>;
}

export interface TutorialSection {
  title: string;
  path: string;
  meta?: Record<string, any>;
  sections: TutorialTOCItem[];
}

async function extractTitleAndMeta(
  filePath: string
): Promise<{ title: string; meta?: Record<string, any> }> {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: meta, content } = matter(fileContents);

  // Extract the first heading as the title
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : "";

  return { title, meta };
}

async function generateSectionToc(
  sectionPath: string
): Promise<TutorialSection> {
  const sectionTitle = path.basename(sectionPath);
  const tocItems: TutorialTOCItem[] = [];

  const sectionMeta = await getTutorialMeta(sectionTitle);

  const files = fs.readdirSync(sectionPath);
  for (const file of files) {
    if (file.endsWith(".mdx") || file.endsWith(".md")) {
      const fullPath = path.join(sectionPath, file);
      const { title: extractedTitle, meta } = await extractTitleAndMeta(
        fullPath
      );
      const fileNameWithoutExt = path.basename(file, path.extname(file));

      const sectionMetaItem = sectionMeta.sections?.find(
        (section: any) => section.fileName === fileNameWithoutExt
      );

      const title =
        sectionMetaItem?.title || extractedTitle || fileNameWithoutExt;

      tocItems.push({
        title,
        url: `/tutorials/${path
          .relative("content/tutorials", fullPath)
          .replace(/\.mdx?$/, "")}`,
        depth: 1,
        meta: sectionMetaItem || meta
      });
    }
  }

  return {
    title: sectionMeta.title || sectionTitle,
    path: sectionPath,
    meta: sectionMeta,
    sections: tocItems
  };
}

export const getTutorialToc = cache(
  async (basePath: string = "content/tutorials") => {
    return generateTutorialToc(basePath);
  }
);

async function generateTutorialToc(
  basePath: string = "content/tutorials"
): Promise<TutorialSection[]> {
  const sections = fs.readdirSync(basePath);
  const toc: TutorialSection[] = [];

  for (const section of sections) {
    const sectionPath = path.join(basePath, section);
    const stat = fs.statSync(sectionPath);

    if (stat.isDirectory()) {
      const sectionToc = await generateSectionToc(sectionPath);
      toc.push(sectionToc);
    }
  }

  return toc;
}

export async function getTutorial(
  tutorialFilename: string
): Promise<TutorialSection | undefined> {
  const toc = await getTutorialToc();
  return toc.find((section) => section.path.endsWith(tutorialFilename));
}

export async function getTutorialSections(
  tutorialFilename: string
): Promise<TutorialTOCItem[]> {
  const data = await getTutorial(tutorialFilename);
  return data?.sections || [];
}
