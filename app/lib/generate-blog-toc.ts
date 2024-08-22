import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data: frontmatter, content } = matter(fileContents);

      // Extract slug, date, and title
      const fileName = path.basename(file);
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
      const date = dateMatch ? dateMatch[1] : "";
      const slug = dateMatch
        ? dateMatch[2]?.replace(/\.(mdx|md)$/, "")
        : fileName.replace(/\.(mdx|md)$/, "");
      const title =
        frontmatter.title ||
        content
          .split("\n")
          .find((line) => line.startsWith("# "))
          ?.replace("# ", "") ||
        slug;

      // Create the blog post entry
      const post: BlogPost = {
        title,
        filename: fileName,
        slug,
        date,
        authors: frontmatter.authors || [],
        tags: frontmatter.tags || [],
        url: `/blog/${slug}`
      };

      posts.push(post);

      // Update the authors overview
      post.authors.forEach((author) => {
        if (authorsOverview[author]) {
          authorsOverview[author].push(post);
        } else {
          authorsOverview[author] = [post];
        }
      });
    }
  }

  // Sort articles for each author by date
  for (const author in authorsOverview) {
    authorsOverview[author] = getSortedArticles(authorsOverview[author]);
  }

  return {
    posts: getSortedArticles(posts),
    authorsOverview
  };
}

export default generateBlogToc;
