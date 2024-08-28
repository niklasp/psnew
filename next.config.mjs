import createMDX from "@next/mdx";
import optimizedImages from "next-optimized-images";
import images from "remark-images";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"]
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [images],
    rehypePlugins: []
  }
});

export default withMDX(nextConfig);
