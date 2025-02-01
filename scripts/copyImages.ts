import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, "..", "content");
const publicDir = path.join(__dirname, "..", "public");

function copyImagesRecursively(source: string, target: string) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const sourceStats = fs.lstatSync(sourcePath);

    if (sourceStats.isDirectory()) {
      copyImagesRecursively(sourcePath, target);
    } else if (file.match(/\.(jpg|jpeg|png|gif|svg)$/i)) {
      const relativePath = path.relative(contentDir, sourcePath);
      const targetPath = path.join(target, relativePath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function copyImages() {
  try {
    copyImagesRecursively(contentDir, publicDir);
    console.log("Images copied successfully");
  } catch (error) {
    console.error("Error copying images:", error);
  }
}

copyImages();
