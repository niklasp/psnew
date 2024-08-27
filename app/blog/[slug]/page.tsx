import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import generateBlogToc from "@/app/lib/generate-blog-toc";
import { CustomMDX } from "@/app/components/mdx";
import { ContentLayout } from "@/app/components/admin-panel/content-layout";
import AdminPanelLayout from "@/app/components/admin-panel/admin-panel-layout";
import { Breadcrumbs, generateBreadcrumbs } from "@/app/components/Breadcrumbs";

interface BlogPostProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = params;
  const { posts } = await generateBlogToc();

  const postFile = posts.find((post) => post.slug === slug)?.filename;
  const postFilePath = path.join("content/blog", `${postFile}`);

  console.log("aaa", postFilePath);

  if (!postFilePath || !fs.existsSync(postFilePath)) {
    // Handle the case where the post doesn't exist
    return <div>Post not found</div>;
  }

  const fileContents = fs.readFileSync(postFilePath, "utf8");
  const { content, data: frontmatter } = matter(fileContents);

  // Serialize the MDX content so it can be rendered
  const mdxSource = content;

  const breadcrumbs = await generateBreadcrumbs({ slug });

  return (
    <ContentLayout title={"test"}>
      <Breadcrumbs items={breadcrumbs} />
      <div className="prose dark:prose-invert w-full mx-auto">
        <CustomMDX source={content} />
      </div>
    </ContentLayout>
  );
}
