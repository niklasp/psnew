import Link from "next/link";
import path from "path";
import fs from "fs";
import { toTitleCase } from "../lib/utils";

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

  const tutorialsDirectory = path.join(
    process.cwd(),
    "tutorials",
    currentTutorial
  );

  // Fetch all .mdx files from the current tutorial directory
  const allFiles = fs
    .readdirSync(tutorialsDirectory)
    .filter((file) => file.endsWith(".mdx"));

  // Create a list of sections, using the meta.ts or the file name as a fallback
  const sectionList = allFiles.map((fileName) => {
    const fileBaseName = fileName.replace(".mdx", "");
    const sectionMeta = sections?.find(
      (section) => section.fileName === fileBaseName
    );
    return {
      fileName: fileBaseName,
      title: sectionMeta ? sectionMeta.title : toTitleCase(fileBaseName)
    };
  });

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
