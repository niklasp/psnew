// lib/generate-toc.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkFrontmatter from "remark-frontmatter";
import { visit } from "unist-util-visit";
import { getTutorialMeta } from "./getTutorialMeta";

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

  // Retrieve the tutorial meta using the function you provided
  const sectionMeta = await getTutorialMeta(sectionTitle);

  const files = fs.readdirSync(sectionPath);
  for (const file of files) {
    const fullPath = path.join(sectionPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isFile() && file.endsWith(".mdx")) {
      const { title, meta } = await extractTitleAndMeta(fullPath);
      const fileNameWithoutExt = path.basename(file, path.extname(file));

      // Find the corresponding meta section for this file
      const sectionMetaItem = sectionMeta.sections?.find(
        (section: any) => section.fileName === fileNameWithoutExt
      );

      tocItems.push({
        title: sectionMetaItem?.title || title,
        url: `/tutorials/${path
          .relative("content/tutorials", fullPath)
          .replace(/\.mdx$/, "")}`,
        depth: 1,
        meta: sectionMetaItem || meta
      });
    }
  }

  return {
    title: sectionTitle,
    path: sectionPath,
    meta: sectionMeta, // Correctly associate the meta to the section
    sections: [...tocItems, ...(sectionMeta?.sections || [])]
  };
}

export async function generateTutorialToc(
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
