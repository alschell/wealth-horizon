
// Define article types for the help center
export type Article = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
};

export type ArticleFeedback = Record<string, boolean | null>;
