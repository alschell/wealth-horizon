
import React from "react";
import { Recommendation } from "./RecommendationsTabContent";

// Update recommendations to use proper string literal type for urgency
export const recommendations: Recommendation[] = [
  {
    id: "rec1",
    title: "Rebalance equity allocation",
    description: "Your equity allocation is 5% above your target. Consider rebalancing to maintain your risk profile.",
    category: "Portfolio Strategy",
    impact: "+1.2% risk-adjusted returns",
    impactValue: 1.2,
    urgency: "high",
    action: "Rebalance Now"
  },
  {
    id: "rec2",
    title: "Tax-loss harvesting opportunity",
    description: "Harvest losses in tech sector to offset capital gains and reduce tax liability.",
    category: "Tax Optimization",
    impact: "Save $15,000 in taxes",
    impactValue: 15000,
    urgency: "medium",
    action: "Review Opportunities"
  },
  {
    id: "rec3",
    title: "Optimize cash position",
    description: "You have $1.2M in cash earning below-market interest. Consider moving to higher yield options.",
    category: "Cash Management",
    impact: "+$24,000 annual income",
    impactValue: 24000,
    urgency: "medium",
    action: "See Options"
  },
  {
    id: "rec4",
    title: "Refinance mortgage opportunity",
    description: "Current mortgage rate is 4.5%. Refinancing could save significant interest over remaining term.",
    category: "Liability Management",
    impact: "Save $120,000 over term",
    impactValue: 120000,
    urgency: "medium",
    action: "Explore Rates"
  },
  {
    id: "rec5",
    title: "ESG alignment review needed",
    description: "Some investments don't align with your ESG preferences. Review and adjust to match your values.",
    category: "ESG Alignment",
    impact: "Align with values",
    impactValue: 0,
    urgency: "low",
    action: "Review Holdings"
  }
];

// Performance chart data
export const performanceData = [
  { month: "Jan", value: 4.2 },
  { month: "Feb", value: 4.5 },
  { month: "Mar", value: 4.8 },
  { month: "Apr", value: 4.7 },
  { month: "May", value: 5.0 },
  { month: "Jun", value: 5.2 },
  { month: "Jul", value: 5.5 },
  { month: "Aug", value: 5.7 },
  { month: "Sep", value: 5.68 }
];

// Asset allocation data
export const assetAllocationData = [
  { name: "Equities", value: 60, color: "#4F46E5" },
  { name: "Fixed Income", value: 20, color: "#818CF8" },
  { name: "Real Estate", value: 10, color: "#A5B4FC" },
  { name: "Alternatives", value: 5, color: "#C7D2FE" },
  { name: "Cash", value: 5, color: "#DDD6FE" }
];

// Enhanced news data with URLs
export const newsData = [
  {
    title: "Fed signals rate cuts possible in September as inflation eases",
    time: "2 hours ago",
    url: "https://www.bloomberg.com/news/articles/2023-08-23/fed-signals-september-rate-cut-possible-as-inflation-eases"
  },
  {
    title: "Global markets rally on positive economic data from US and Europe",
    time: "4 hours ago",
    url: "https://www.bloomberg.com/news/articles/2023-08-23/global-markets-rally-on-positive-economic-data"
  },
  {
    title: "Tech sector leads gains as major earnings beat analyst expectations",
    time: "Yesterday",
    url: "https://www.bloomberg.com/news/articles/2023-08-22/tech-sector-leads-gains-as-earnings-beat-expectations"
  },
  {
    title: "Oil prices stabilize after recent volatility, Brent crude at $82",
    time: "Yesterday",
    url: "https://www.bloomberg.com/news/articles/2023-08-22/oil-prices-stabilize-after-volatility"
  }
];

// Chart config
export const chartConfig = {
  "value": {
    label: "Net Worth",
    color: "#000000"
  }
};
