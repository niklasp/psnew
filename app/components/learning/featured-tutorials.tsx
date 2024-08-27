import { BookHeart } from "lucide-react";
import TutorialCard from "./tutorial/tutorial-card";

export function FeaturedTutorials({ tutorials }: { tutorials: any[] }) {
  return (
    <section className="mb-12">
      <h4 className="text-xl font-bold sm:truncate sm:tracking-tight flex items-center my-4">
        <BookHeart className="mr-2" /> Featured Tutorials
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        {tutorials?.map((tutorial) => (
          <TutorialCard
            key={tutorial.tutorial}
            tutorial={tutorial.tutorial}
            meta={tutorial.meta}
            minimal
          />
        ))}
      </div>
    </section>
  );
}
