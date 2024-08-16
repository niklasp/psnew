import fs from "fs";
import path from "path";
import { getTutorialMeta } from "@/app/lib/getTutorialMeta";
import TutorialCard from "@/app/components/learning/tutorial/tutorial-card";
import { ContentLayout } from "../components/admin-panel/content-layout";
import { TutorialGrid } from "../components/learning/tutorial-grid";
import { BookHeart } from "lucide-react";
import { featured } from "../lib/config";

export default async function TutorialsOverviewPage() {
  const tutorialsDirectory = path.join(process.cwd(), "tutorials");
  const tutorialDirs = fs
    .readdirSync(tutorialsDirectory)
    .filter((dir) =>
      fs.lstatSync(path.join(tutorialsDirectory, dir)).isDirectory()
    );

  const tutorials = await Promise.all(
    tutorialDirs.map(async (tutorial) => {
      const meta = await getTutorialMeta(tutorial);
      console.log("meta", tutorial);
      return { tutorial, meta };
    })
  );

  const featuredTutorials = tutorials.filter((tutorial) =>
    featured.includes(tutorial.tutorial)
  );

  return (
    <ContentLayout title="Tutorials">
      <div className="container mx-auto px-4">
        <div className="pb-5 mb-5 flex items-baseline">
          <h3 className="text-2xl font-bold sm:truncate sm:text-3xl sm:tracking-tight inline-block">
            Explore Polkadot Tutorials
          </h3>
        </div>

        {/* <section>
        <h4 className="text-xl font-bold sm:truncate sm:tracking-tight flex items-center my-4">
          <TrendingUp className="mr-2" /> Trending Tutorials
        </h4>
      </section> */}
        <section className="mb-8">
          <h4 className="text-xl font-bold sm:truncate sm:tracking-tight flex items-center my-4">
            <BookHeart className="mr-2" /> Featured Tutorials
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            {featuredTutorials?.map((tutorial) => (
              <TutorialCard
                key={tutorial.tutorial}
                tutorial={tutorial.tutorial}
                meta={tutorial.meta}
                minimal
              />
            ))}
          </div>
        </section>
        <TutorialGrid tutorials={tutorials} />
      </div>
    </ContentLayout>
  );
}
