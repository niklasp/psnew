import fs from "fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TutorialIntroTop } from "@/app/components/learning/tutorial/tutorial-intro-top";
import { getTutorialMeta } from "@/app/lib/getTutorialMeta";
import { TutorialSyllabus } from "@/app/components/learning/tutorial/tutorial-syllabus";
import { TutorialIntroBottom } from "@/app/components/learning/tutorial/tutorial-intro-bottom";
import { Button } from "@/app/components/ui/button";
import { BookType } from "lucide-react";
import { getTutorialPath, getTutorialSections } from "@/app/lib/util-path";
import { Breadcrumbs, generateBreadcrumbs } from "@/app/components/breadcrumbs";

export default async function TutorialOverviewPage({
  params
}: {
  params: { tutorial: string };
}) {
  const { tutorial } = params;

  const tutorialPath = getTutorialPath(tutorial);

  // Check if the tutorial directory exists
  if (!fs.existsSync(tutorialPath)) {
    return notFound();
  }

  const meta = await getTutorialMeta(tutorial);
  const sections = getTutorialSections(tutorial, meta.sections);
  const tutorialBreadcrumbs = await generateBreadcrumbs({
    tutorial: params.tutorial
  });

  return (
    <main className="px-8 py-4 overflow-hidden w-full">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs items={tutorialBreadcrumbs} />
        <TutorialIntroTop tutorial={tutorial} meta={meta} />
        <TutorialIntroBottom tutorial={tutorial} meta={meta} />
        <TutorialSyllabus sections={sections} tutorial={tutorial} />

        <Link href={`/tutorials/${tutorial}/${sections[0]?.fileName}`}>
          <Button className="w-full h-16 text-lg">
            {" "}
            <BookType strokeWidth={1.5} className="mr-2" size={20} /> Start
            Tutorial
          </Button>
        </Link>
      </div>
    </main>
  );
}
