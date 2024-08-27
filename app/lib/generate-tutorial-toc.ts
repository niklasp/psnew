// lib/generate-toc.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
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

  // Extract frontmatter and content
  const { content, data: meta } = matter(fileContents);

  // Use remark to parse the content and extract the first heading
  let title = "";
  await remark()
    .use(remarkFrontmatter)
    .use(() => (tree) => {
      visit(tree, "heading", (node) => {
        if (node.depth === 1 && title === "") {
          visit(node, "text", (textNode) => {
            title = textNode.value;
          });
        }
      });
    })
    .process(content);

  return { title, meta };
}

async function generateSectionToc(
  sectionPath: string
): Promise<TutorialSection> {
  const sectionTitle = path.basename(sectionPath);
  const tocItems: TutorialTOCItem[] = [];

  // Retrieve the tutorial meta using the improved function
  const sectionMeta = await getTutorialMeta(sectionTitle);

  const files = fs.readdirSync(sectionPath);
  for (const file of files) {
    if (file.endsWith(".mdx") || file.endsWith(".md")) {
      const fullPath = path.join(sectionPath, file);
      const { title: extractedTitle, meta } = await extractTitleAndMeta(
        fullPath
      );
      const fileNameWithoutExt = path.basename(file, path.extname(file));

      // Find the corresponding meta section for this file
      const sectionMetaItem = sectionMeta.sections.find(
        (section) => section.fileName === fileNameWithoutExt
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

// Cache the result of generateTutorialToc
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

// Helper function to get a specific section
export async function getTutorial(
  tutorialFilename: string
): Promise<TutorialSection | undefined> {
  const toc = await getTutorialToc();
  const data = toc.find((section) => section.path.endsWith(tutorialFilename));
  return data;
}

export async function getTutorialSections(
  tutorialFilename: string
): Promise<TutorialTOCItem[]> {
  const data = await getTutorial(tutorialFilename);
  return data?.sections || [];
}
