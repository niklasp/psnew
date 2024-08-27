import fs from "fs";
import path from "path";
import { toTitleCase } from "./utils";
import { getFileMetadata } from "./util-file";

export async function getTutorialMeta(tutorial: string) {
  const tutorialPath = path.join(
    process.cwd(),
    "content",
    "tutorials",
    tutorial
  );
  const metaPath = path.join(tutorialPath, "meta.ts");

  let meta = {
    title: toTitleCase(tutorial.replace(/-/g, " ")),
    description: "",
    category: "Uncategorized",
    tags: [],
    level: "beginner",
    duration: "1-2h",
    lastUpdated: "",
    sections: []
  };

  try {
    if (fs.existsSync(metaPath)) {
      const importedMeta = (
        await import(`@/content/tutorials/${tutorial}/meta`)
      ).meta;
      meta = { ...meta, ...importedMeta };
    }
  } catch (error) {
    console.warn(
      `Warning: meta.ts not found or invalid for tutorial "${tutorial}". Using default metadata.`
    );
  }

  // Auto-populate sections if not provided
  if (meta.sections.length === 0) {
    const files = fs
      .readdirSync(tutorialPath)
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .sort((a, b) => {
        const aNum = parseInt(a.split("-")[0]);
        const bNum = parseInt(b.split("-")[0]);
        return aNum - bNum;
      });

    meta.sections = files.map((file) => {
      const { title, slug } = getFileMetadata(path.join(tutorialPath, file));
      return {
        fileName: slug,
        title:
          title || toTitleCase(slug.replace(/^\d+-/, "").replace(/-/g, " "))
      };
    });
  }

  return meta;
}
