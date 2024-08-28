export type difficultyType = "beginner" | "intermediate" | "expert";

export type TutorialMeta = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  level: difficultyType;
  duration: string;
  lastUpdated: string;
  sections: any[];
};
