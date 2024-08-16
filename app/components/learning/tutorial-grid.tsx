"use client";

import { useApp } from "@/app/providers/app-provider";
import TutorialCard from "./tutorial/tutorial-card";
import {
  Donut,
  DonutIcon,
  TrendingUp,
  FileSpreadsheet,
  BookOpen,
  BookHeart
} from "lucide-react";

export function TutorialGrid({ tutorials }: { tutorials: any[] }) {
  const { filters } = useApp();

  const filteredTutorials = tutorials
    .filter(({ meta: { category } }) => {
      return (
        filters.category.length === 0 || filters.category.includes(category)
      );
    })
    .filter(({ meta: { tags } }) => {
      return (
        filters.tags.length === 0 ||
        filters.tags.some((tag) => tags.includes(tag))
      );
    })
    .filter(({ meta: { level } }) => {
      return (
        filters.level.length === 0 ||
        filters.level.map((l) => l.toLowerCase()).includes(level)
      );
    });

  const { category, tags, level } = filters;

  const categoryText =
    category.length > 0 ? `categorized as ${category.join(", ")}` : "";
  const tagsText = tags.length > 0 ? `with tags ${tags.join(", ")}` : "";
  const levelText = level.length > 0 ? `with level ${level.join(", ")}` : "";

  const parts = [categoryText, tagsText, levelText].filter(
    (part) => part !== ""
  );

  const resultText = `${filteredTutorials.length} ${
    filteredTutorials.length !== 1 ? "tutorials" : "tutorial"
  } ${parts.length > 0 ? `${parts.join(" ")}` : ""}`;

  return (
    <>
      <section>
        <h3 className="text-xl font-bold sm:truncate sm:tracking-tight flex items-center my-4 mb-0">
          <BookOpen className="mr-2" />
          Browse the full catalog{" "}
        </h3>
        <p className="text-polkadot-primary-500 px-1 text-sm font-normal mb-4 max-w-1/2">
          {resultText}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {filteredTutorials.map(({ tutorial, meta }) => (
            <TutorialCard key={tutorial} tutorial={tutorial} meta={meta} />
          ))}
        </div>
      </section>
    </>
  );
}
