
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  image: string;
  category: string;
  datePublished: string;
  isBreaking: boolean;
  url: string;
}

export interface NewsSectionProps {
  articleId?: string;
}
