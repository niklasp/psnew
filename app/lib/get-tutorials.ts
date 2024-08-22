import { getTutorialMeta } from "./getTutorialMeta";
import { tutorialDirs } from "./util-path";

export async function getTutorials() {
  return Promise.all(
    tutorialDirs.map(async (tutorial) => {
      const meta = await getTutorialMeta(tutorial);
      return { tutorial, meta };
    })
  );
}
