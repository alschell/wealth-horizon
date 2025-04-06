
// Sample data for the Performance Overview component

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

// Enhanced recommendations with the proper structure for RecommendationsTabContent
export const recommendations = [
  { 
    title: "Rebalance Equity Allocation",
    description: "Rebalance your equity allocation to reduce risk", 
    impact: "High",
    type: "Portfolio"
  },
  { 
    title: "Increase Fixed Income",
    description: "Consider increasing fixed income exposure by 8%", 
    impact: "Medium",
    type: "Allocation"
  },
  {
    title: "Implement Currency Hedging",
    description: "Implement currency hedging for EUR exposure",
    impact: "High",
    type: "Risk"
  },
  {
    title: "Reduce ETF Overlap",
    description: "Review technology ETFs for overlap reduction",
    impact: "Medium",
    type: "Efficiency"
  },
  {
    title: "Active Management",
    description: "Transition 15% to active management strategies",
    impact: "Medium",
    type: "Strategy"
  },
  {
    title: "Tax-Loss Harvesting",
    description: "Evaluate tax-loss harvesting opportunities",
    impact: "Medium",
    type: "Tax"
  }
];

// Chart config
export const chartConfig = {
  "value": {
    label: "Net Worth",
    color: "#000000"
  }
};
