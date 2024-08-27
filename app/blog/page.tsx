import { Content } from "next/font/google";
import generateBlogToc from "../lib/generate-blog-toc";
import { ContentLayout } from "../components/admin-panel/content-layout";
import { PostListItem } from "./post-list-item";

export default async function BlogPage() {
  const { posts, authorsOverview } = await generateBlogToc();

  return (
    <ContentLayout title="Blog">
      <div>
        <h1 className="text-2xl font-bold sm:truncate sm:text-3xl sm:tracking-tight inline-block">
          Polkadot Study Blog
        </h1>
        <p>Viewing {posts.length} posts</p>

        <div className="grid gap-3 py-6">
          {posts?.map((post) => (
            <PostListItem post={post} key={post.slug} />
          ))}
        </div>

        {/* <h2 className="text-2xl font-bold">Authors</h2>

        {JSON.stringify(authorsOverview)} */}
      </div>
    </ContentLayout>
  );
}
