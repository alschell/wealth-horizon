
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
}

export interface NewsSectionProps {
  news: NewsItem[];
  // Add articleId property that's being used
  articleId?: string;
}
