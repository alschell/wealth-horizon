
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
  // Additional properties used in NewsGrid and newsUtils
  image?: string;
  imageUrl?: string;
  category?: string;
  headline?: string;
  datetime?: number;
  datePublished?: string;
  isBreaking?: boolean;
}

export interface NewsSectionProps {
  news: NewsItem[];
  articleId?: string;
}

// Add the newsCategories object for NewsHeader
export const newsCategories = {
  all: "All Categories",
  markets: "Markets",
  stocks: "Stocks",
  commodities: "Commodities",
  forex: "Forex",
  crypto: "Crypto",
  economy: "Economy"
};

export interface ChartDataPoint {
  date: string;
  value: number;
}
