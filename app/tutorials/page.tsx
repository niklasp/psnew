import { ContentLayout } from "../components/admin-panel/content-layout";
import { TutorialGrid } from "../components/learning/tutorial/tutorial-grid";
import { featured } from "../lib/config";
import { FeaturedTutorials } from "../components/learning/featured-tutorials";
import { getTutorials } from "../lib/get-tutorials";

export default async function TutorialsOverviewPage() {
  const tutorials = await getTutorials();

  const featuredTutorials =
    tutorials?.filter((tutorial) => featured.includes(tutorial.tutorial)) || [];

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
        <FeaturedTutorials tutorials={featuredTutorials} />
        <TutorialGrid
          tutorials={tutorials}
          title="Browse the full Catalog"
          withFilters
        />
      </div>
    </ContentLayout>
  );
}
