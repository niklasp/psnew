import Link from "next/link";
import path from "path";
import fs from "fs";
import { toTitleCase } from "../lib/utils";
import { getTutorialPath, getTutorialSections } from "../lib/util-path";

interface TOCProps {
  currentTutorial: string;
  currentSection?: string;
  currentMeta: any;
  otherTutorials: any[];
}

export default function TOC({
  currentTutorial,
  currentSection,
  currentMeta,
  otherTutorials
}: TOCProps) {
  const { category, sections } = currentMeta;

  const sectionList = getTutorialSections(currentTutorial, sections);

  return (
    <div className="toc">
      <h2>Table of Contents</h2>
      <p>
        <strong>Category:</strong> {category}
      </p>
      <ul>
        {sectionList.map((section) => (
          <li key={section.fileName}>
            <Link
              href={`/tutorials/${currentTutorial}/${section.fileName}`}
              className={section.fileName === currentSection ? "active" : ""}
            >
              {section.title || toTitleCase(section.fileName)}
            </Link>
          </li>
        ))}
      </ul>

      {otherTutorials.length > 0 && (
        <>
          <h3>Other Tutorials in This Category</h3>
          <ul>
            {otherTutorials.map((tut) => (
              <li key={tut.tutorial}>
                <Link href={`/tutorials/${tut.tutorial}`}>
                  {tut.meta.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
