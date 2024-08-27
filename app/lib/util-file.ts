import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getFileMetadata(filePath: string) {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  const fileName = path.basename(filePath);
  const slug = fileName.replace(/\.(mdx|md)$/, "");
  const title =
    frontmatter.title ||
    content
      .split("\n")
      .find((line) => line.startsWith("# "))
      ?.replace("# ", "") ||
    slug;

  return {
    title,
    slug,
    frontmatter,
    content
  };
}
