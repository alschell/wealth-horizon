
import { NewsSource, NewsCategory } from "../CustomizeNewsDialog";

// Default sources and categories - sorts alphabetically
export const defaultSources: NewsSource[] = [
  { id: "bloomberg", name: "Bloomberg", description: "Financial and business news" },
  { id: "cnbc", name: "CNBC", description: "Financial and business news" },
  { id: "ft", name: "Financial Times", description: "Global financial news" },
  { id: "reuters", name: "Reuters", description: "Global news and markets" },
  { id: "wsj", name: "Wall Street Journal", description: "Business and markets" }
];

export const defaultCategories: NewsCategory[] = [
  { id: "companies", name: "Companies", description: "Corporate news and earnings" },
  { id: "economy", name: "Economy", description: "Economic news and indicators" },
  { id: "finance", name: "Finance", description: "Financial industry news" },
  { id: "markets", name: "Markets", description: "Stock, bond, and commodity markets" },
  { id: "technology", name: "Technology", description: "Tech industry news" }
];
