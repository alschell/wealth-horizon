import { NewsItem } from "../types";

// Filter news items based on category and search term
export const filterNewsItems = (
  items: NewsItem[], 
  category: string, 
  searchTerm: string
): NewsItem[] => {
  return items.filter(item => {
    if (category !== "all" && item.category !== category) return false;
    const title = item.title || item.headline || "";
    if (searchTerm && !title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });
};

// Mock news data - would come from API in real app
export const getNewsItems = (): NewsItem[] => {
  return [
    {
      id: "1",
      title: "Fed signals potential rate cuts later this year as inflation cools",
      summary: "Federal Reserve officials indicated they're getting closer to cutting interest rates as inflation shows signs of returning to their 2% target.",
      source: "Financial Times",
      date: "2h ago",
      url: "#",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=FT",
      imageUrl: "https://placehold.co/600x400/e2e8f0/64748b?text=FT",
      category: "markets",
      headline: "Fed signals potential rate cuts later this year as inflation cools",
      datetime: new Date().getTime(),
      datePublished: "2h ago"
    },
    {
      id: "2",
      title: "Tech stocks rally on positive earnings outlook from major players",
      summary: "Technology shares led a market rally after several major companies reported better-than-expected quarterly results and raised their annual forecasts.",
      source: "Wall Street Journal",
      date: "4h ago",
      url: "#",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=WSJ",
      category: "stocks",
      datePublished: "4h ago",
      isBreaking: false
    },
    {
      id: "3",
      title: "Oil prices retreat as supply concerns ease following diplomatic progress",
      summary: "Crude oil futures declined after diplomatic efforts reduced geopolitical tensions in key oil-producing regions, easing supply disruption fears.",
      source: "Bloomberg",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Bloomberg",
      category: "commodities",
      datePublished: "6h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "4",
      title: "European Central Bank holds rates steady, signals patience on easing",
      summary: "The ECB maintained its key interest rates unchanged while suggesting it would take a cautious approach to future rate cuts despite slowing inflation.",
      source: "Reuters",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Reuters",
      category: "markets",
      datePublished: "8h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "5",
      title: "Major pharmaceutical merger creates industry giant in $80 billion deal",
      summary: "Two leading pharmaceutical companies announced a merger agreement that will create one of the world's largest healthcare corporations.",
      source: "CNBC",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=CNBC",
      category: "stocks",
      datePublished: "10h ago",
      isBreaking: true,
      url: "#"
    },
    {
      id: "6",
      title: "Gold reaches record high amid economic uncertainty and central bank buying",
      summary: "Gold prices touched an all-time high as investors sought safe-haven assets amid economic uncertainties and continued central bank purchases.",
      source: "Market Watch",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=MarketWatch",
      category: "commodities",
      datePublished: "12h ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "7",
      title: "Global supply chain disruptions impact semiconductor availability",
      summary: "Ongoing disruptions in global supply chains are causing shortages of critical semiconductor components, affecting multiple industries.",
      source: "The Economist",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Economist",
      category: "markets",
      datePublished: "1d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "8",
      title: "Renewable energy investments reach new highs in first quarter",
      summary: "Global investments in renewable energy projects hit record levels in Q1 2025, driven by policy incentives and corporate sustainability targets.",
      source: "Financial Times",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=FT",
      category: "stocks",
      datePublished: "1d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "9",
      title: "Housing market shows signs of cooling after two years of rapid growth",
      summary: "Latest data indicates a slowdown in housing price growth in major markets, with analysts suggesting a normalization rather than a sharp correction.",
      source: "Wall Street Journal",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=WSJ",
      category: "markets",
      datePublished: "2d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "10",
      title: "Agriculture futures surge on adverse weather reports",
      summary: "Wheat, corn and soybean futures rose sharply following forecasts of adverse weather conditions in key growing regions, raising supply concerns.",
      source: "Bloomberg",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Bloomberg",
      category: "commodities",
      datePublished: "2d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "11",
      title: "Major tech company announces ambitious AI investment plan",
      summary: "A leading technology corporation has unveiled a $10 billion investment plan focused on artificial intelligence development over the next five years.",
      source: "CNBC",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=CNBC",
      category: "stocks",
      datePublished: "3d ago",
      isBreaking: false,
      url: "#"
    },
    {
      id: "12",
      title: "Central banks worldwide accumulate gold at fastest pace in decades",
      summary: "Global central banks are purchasing gold at the fastest rate in 50 years, diversifying reserves away from traditional currencies.",
      source: "Reuters",
      image: "https://placehold.co/600x400/e2e8f0/64748b?text=Reuters",
      category: "commodities",
      datePublished: "3d ago",
      isBreaking: false,
      url: "#"
    }
  ];
};
