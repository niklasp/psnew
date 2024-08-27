import fs from "fs";
import path from "path";

import { getFileMetadata } from "./util-file";

interface BlogPost {
  title: string;
  filename: string;
  slug: string;
  date: string;
  authors: string[];
  tags: string[];
  url: string;
}

export interface BlogTOC {
  posts: BlogPost[];
  authorsOverview: Record<string, BlogPost[]>;
}

function getSortedArticles(articles: BlogPost[]): BlogPost[] {
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function generateBlogToc(
  blogPath: string = "content/blog"
): Promise<BlogTOC> {
  const files = fs.readdirSync(blogPath);
  const posts: BlogPost[] = [];
  const authorsOverview: Record<string, BlogPost[]> = {};

  for (const file of files) {
    const fullPath = path.join(blogPath, file);
    const stat = fs.statSync(fullPath);

    if ((stat.isFile() && file.endsWith(".mdx")) || file.endsWith(".md")) {
      const { title, slug, frontmatter } = getFileMetadata(fullPath);

      const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
      const date = dateMatch ? dateMatch[1] : frontmatter.date || "";

      const post: BlogPost = {
        title,
        filename: file,
        slug,
        date,
        authors: frontmatter.authors || [],
        tags: frontmatter.tags || [],
        url: `/blog/${slug}`
      };

      posts.push(post);

      post.authors.forEach((author) => {
        if (authorsOverview[author]) {
          authorsOverview[author].push(post);
        } else {
          authorsOverview[author] = [post];
        }
      });
    }
  }

  for (const author in authorsOverview) {
    authorsOverview[author] = getSortedArticles(authorsOverview[author]);
  }

  return {
    posts: getSortedArticles(posts),
    authorsOverview
  };
}

export default generateBlogToc;
