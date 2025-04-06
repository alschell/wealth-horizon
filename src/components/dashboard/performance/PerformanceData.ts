
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
  { name: "Equities", value: 60 },
  { name: "Fixed Income", value: 20 },
  { name: "Real Estate", value: 10 },
  { name: "Alternatives", value: 5 },
  { name: "Cash", value: 5 }
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

// Recommendations
export const recommendations = [
  { text: "Rebalance your equity allocation to reduce risk", priority: "high" },
  { text: "Consider increasing fixed income exposure", priority: "medium" }
];

// Chart config
export const chartConfig = {
  "value": {
    label: "Net Worth",
    color: "#000000"
  }
};
