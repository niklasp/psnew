import type { MDXComponents } from "mdx/types";
import Quiz from "@/app/components/learning/quiz";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Quiz
  };
}
