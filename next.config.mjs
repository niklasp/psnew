import path from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false
  },
  webpack: (config) => {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(
              __dirname,
              "content/**/assets/**/*.{png,jpg,jpeg,gif,svg,webp}"
            ),
            to({ context, absoluteFilename }) {
              const relativePath = path.relative(
                path.resolve(__dirname, "content"),
                absoluteFilename
              );
              return path.join("static/images", relativePath);
            }
          },
          {
            from: path.resolve(
              __dirname,
              "content/**/images/**/*.{png,jpg,jpeg,gif,svg,webp}"
            ),
            to({ context, absoluteFilename }) {
              const relativePath = path.relative(
                path.resolve(__dirname, "content"),
                absoluteFilename
              );
              return path.join("static/images", relativePath);
            }
          }
        ]
      })
    );
    return config;
  }
};

const prettyCodeOptions = {
  theme: "github-dark",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  }
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]]
  }
});

export default withMDX(nextConfig);
