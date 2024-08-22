import Link from "next/link";

export function PostListItem({
  post
}: {
  post: {
    title: string;
    date: string;
    tags?: string[];
    authors?: string[];
    slug: string;
  };
}) {
  const { title, date, tags, authors, slug } = post;
  return (
    <Link href={`/blog/${slug}`}>
      <article className="rounded-md py-4 self-start">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{new Date(date).toLocaleDateString()}</p>
        <p>{tags?.join(", ")}</p>
        <p className="text-xs">By {authors?.join(", ")}</p>
      </article>
    </Link>
  );
}
