import fs from "fs";
import path from "path";
import chalk from "chalk";
import { execSync } from "child_process";

const tutorialsPath = path.join(process.cwd(), "content", "tutorials");

function hasChangesInTutorial(tutorialPath: string): boolean {
  try {
    const result = execSync(
      `git diff --quiet HEAD -- "${tutorialPath}" || echo "changed"`
    )
      .toString()
      .trim();
    return result === "changed";
  } catch (error) {
    console.error(`Error checking changes for ${tutorialPath}:`, error);
    return false;
  }
}

function updateTutorialMeta(tutorialPath: string) {
  if (!hasChangesInTutorial(tutorialPath)) {
    console.info(
      chalk.blue(`[info] No changes in ${tutorialPath}, skipping update.`)
    );
    return;
  }

  const metaPath = path.join(tutorialPath, "meta.ts");
  const lastUpdated = new Date().toISOString();

  let metaContent: string;
  if (fs.existsSync(metaPath)) {
    metaContent = fs.readFileSync(metaPath, "utf8");
    if (metaContent.includes("lastUpdated:")) {
      metaContent = metaContent.replace(
        /lastUpdated:.*,/,
        `lastUpdated: '${lastUpdated}',`
      );
    } else {
      metaContent = metaContent.replace(
        "export const meta = {",
        `export const meta = {\n  lastUpdated: '${lastUpdated}',`
      );
    }
  } else {
    metaContent = `export const meta = {\n  lastUpdated: '${lastUpdated}',\n  title: '${path.basename(
      tutorialPath
    )}',\n  description: '',\n  category: 'Uncategorized',\n  tags: [],\n  sections: []\n};\n`;
  }

  console.info(
    chalk.green(`[info] Updated ${tutorialPath} lastUpdated to ${lastUpdated}`)
  );
  fs.writeFileSync(metaPath, metaContent);
}

function processTutorials() {
  console.info(chalk.green("[info] Updating tutorial metadata..."));
  const tutorials = fs.readdirSync(tutorialsPath);
  tutorials.forEach((tutorial) => {
    const tutorialPath = path.join(tutorialsPath, tutorial);
    if (fs.statSync(tutorialPath).isDirectory()) {
      updateTutorialMeta(tutorialPath);
    }
  });
}

processTutorials();
