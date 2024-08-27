import fs from "fs";
import path from "path";
import { getFileMetadata } from "./util-file";

interface AuthorPost {
  title: string;
  filename: string;
  slug: string;
  date: string;
  tags: string[];
  url: string;
}

interface AuthorDirectory {
  name: string;
  posts: AuthorPost[];
  subdirectories: AuthorDirectory[];
}

export interface AuthorsTOC {
  topLevelPosts: AuthorPost[];
  directories: AuthorDirectory[];
}

function createPost(
  fullPath: string,
  file: string,
  relativePath: string
): AuthorPost {
  const { title, slug, frontmatter } = getFileMetadata(fullPath);

  return {
    title,
    filename: file,
    slug: path.join(relativePath, slug),
    date: frontmatter.date || "",
    tags: frontmatter.tags || [],
    url: `/authors/${path.join(relativePath, slug)}`
  };
}

export async function generateAuthorsToc(
  authorsPath: string = "content/authors"
): Promise<AuthorsTOC> {
  function traverseDirectory(
    currentPath: string,
    relativePath: string = ""
  ): AuthorDirectory {
    const files = fs.readdirSync(currentPath);
    const directory: AuthorDirectory = {
      name: path.basename(currentPath),
      posts: [],
      subdirectories: []
    };

    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        const subdirectory = traverseDirectory(
          fullPath,
          path.join(relativePath, file)
        );
        directory.subdirectories.push(subdirectory);
      } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const post = createPost(fullPath, file, relativePath);
        directory.posts.push(post);
      }
    }

    directory.posts.sort((a, b) => b.date.localeCompare(a.date));

    return directory;
  }

  const rootDirectory = traverseDirectory(authorsPath);
  const topLevelPosts: AuthorPost[] = [];

  fs.readdirSync(authorsPath).forEach((file) => {
    const fullPath = path.join(authorsPath, file);
    if (
      fs.statSync(fullPath).isFile() &&
      (file.endsWith(".mdx") || file.endsWith(".md"))
    ) {
      const post = createPost(fullPath, file, "");
      topLevelPosts.push(post);
    }
  });

  topLevelPosts.sort((a, b) => b.date.localeCompare(a.date));

  return {
    topLevelPosts,
    directories: rootDirectory.subdirectories
  };
}

export default generateAuthorsToc;
