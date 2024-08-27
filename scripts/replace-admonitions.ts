import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceAdmonitions(content: string): string {
  const regex = /:::(info|warning|danger)\s*([\s\S]*?):::/g;
  return content.replace(regex, (match, type, content) => {
    return `<Box type="${type}">
${content.trim()}
</Box>`;
  });
}

async function processFile(filePath: string): Promise<void> {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const updatedContent = replaceAdmonitions(data);
    await fs.writeFile(filePath, updatedContent, "utf8");
    console.log(`Successfully updated ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}:`, err);
  }
}

async function processDirectory(directoryPath: string): Promise<void> {
  try {
    const files = await fs.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);
      if (stats.isDirectory()) {
        await processDirectory(filePath);
      } else if (path.extname(file) === ".mdx") {
        await processFile(filePath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${directoryPath}:`, err);
  }
}

// Replace 'path/to/your/content' with the actual path to your content directory
const contentDir = path.join(__dirname, "..", "content");
processDirectory(contentDir).catch(console.error);
