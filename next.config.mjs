import createMDX from "@next/mdx";
import { remarkAdmonitions } from "./app/components/learning/remarkAdmonitions.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkAdmonitions],
    rehypePlugins: []
  }
});

export default withMDX(nextConfig);
