import React from "react";
import AdminPanelLayout from "@/app/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "../../components/admin-panel/content-layout";
import generateAuthorsToc from "../../lib/generate-authors-toc";
import { CustomMDX } from "@/app/components/mdx";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default async function AuthorsPage({
  params
}: {
  params: { slug?: string[] };
}) {
  const slugPath = params.slug?.join("/") || "";
  const authorsToc = await generateAuthorsToc();

  let content = "";
  let title = "Authors";

  if (slugPath) {
    let filePath: string;

    if (slugPath === "new-tutorial-on-polkadot-study") {
      filePath = path.join(
        process.cwd(),
        "content",
        "authors",
        "new-tutorial-on-polkadot-study",
        "0-intro.mdx"
      );
    } else {
      const matchingPost =
        authorsToc.topLevelPosts.find((post) => post.slug === slugPath) ||
        authorsToc.directories
          .flatMap((dir) => dir.posts)
          .find((post) => post.slug === slugPath);

      if (matchingPost) {
        filePath = path.join(
          process.cwd(),
          "content",
          "authors",
          `${matchingPost.filename}`
        );
      } else {
        filePath = path.join(
          process.cwd(),
          "content",
          "authors",
          `${slugPath}.mdx`
        );
      }
    }

    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { content: pageContent, data } = matter(fileContents);
      content = pageContent;
      title = data.title || path.basename(filePath, path.extname(filePath));
    } else {
      content = "# Page Not Found\n\nThe requested page could not be found.";
      title = "Not Found";
    }
  } else {
    // Root /authors route
    const rootFilePath = path.join(
      process.cwd(),
      "content",
      "authors",
      "authors.md"
    );
    if (fs.existsSync(rootFilePath)) {
      const fileContents = fs.readFileSync(rootFilePath, "utf8");
      const { content: pageContent, data } = matter(fileContents);
      content = pageContent;
      title = data.title || "Authors";
    } else {
      content = "# Welcome to Authors\n\nThis is the landing page for authors.";
    }
  }

  return (
    <AdminPanelLayout>
      <ContentLayout title={title}>
        <div className="container mx-auto px-4">
          <div className="prose dark:prose-invert w-full mx-auto">
            <CustomMDX source={content} />
          </div>
        </div>
      </ContentLayout>
    </AdminPanelLayout>
  );
}
