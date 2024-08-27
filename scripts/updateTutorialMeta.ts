import fs from "fs";
import path from "path";

const tutorialsPath = path.join(process.cwd(), "content", "tutorials");

function updateTutorialMeta(tutorialPath: string) {
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

  fs.writeFileSync(metaPath, metaContent);
}

function processTutorials() {
  const tutorials = fs.readdirSync(tutorialsPath);
  tutorials.forEach((tutorial) => {
    const tutorialPath = path.join(tutorialsPath, tutorial);
    if (fs.statSync(tutorialPath).isDirectory()) {
      updateTutorialMeta(tutorialPath);
    }
  });
}

processTutorials();
