import path from "path";
import { toTitleCase } from "./utils";

export async function getTutorialMeta(tutorial: string) {
  let meta = {
    title: toTitleCase(tutorial),
    description: "",
    category: "Uncategorized",
    tags: [],
    sections: []
  };
  try {
    meta = {
      ...meta,
      ...(await import(`@/content/tutorials/${tutorial}/meta`)).meta
    };
  } catch (error) {
    console.warn(
      `Warning: meta.ts not found for tutorial "${tutorial}". Using default metadata.`
    );
  }

  return meta;
}
