
export interface NewsSectionProps {
  articleId?: string;
}

export interface NewsCategories {
  [key: string]: string;
}

export const newsCategories: NewsCategories = {
  all: "All Categories",
  general: "General",
  forex: "Forex",
  crypto: "Cryptocurrency",
  merger: "Mergers",
  economy: "Economy",
  technology: "Technology",
  financial: "Financial",
  business: "Business"
};

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  date: string;
  url: string;
  category: string;
}

// Add the NewsItem interface that was referenced
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  image?: string;
  source: string;
  date?: string;
  datePublished?: string;
  url: string;
  category: string;
  headline?: string;
  datetime?: number;
  isBreaking?: boolean;
}
