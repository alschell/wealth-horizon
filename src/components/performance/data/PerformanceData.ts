
// Sample data for the Performance Overview component

// Complete performance data object
export const performanceData = {
  totalAssets: "$5.68B",
  changeAmount: "+$240M",
  changePercentage: "4.2%",
  changeType: "increase",
  keyMetrics: [
    { name: "Total Assets", value: "$5.68B", change: "+5.2%", trend: "up" },
    { name: "Total Liabilities", value: "$1.20B", change: "-2.3%", trend: "down" },
    { name: "Cash Balance", value: "$1.28B", change: "+1.2%", trend: "neutral" },
    { name: "Investments", value: "$3.40B", change: "+8.5%", trend: "up" }
  ],
  performanceTrend: [
    { month: "Jan", value: 4.2 },
    { month: "Feb", value: 4.5 },
    { month: "Mar", value: 4.8 },
    { month: "Apr", value: 4.7 },
    { month: "May", value: 5.0 },
    { month: "Jun", value: 5.2 },
    { month: "Jul", value: 5.5 },
    { month: "Aug", value: 5.7 },
    { month: "Sep", value: 5.68 }
  ],
  assetAllocation: [
    { name: "Equities", value: 60 },
    { name: "Fixed Income", value: 20 },
    { name: "Real Estate", value: 10 },
    { name: "Alternatives", value: 5 },
    { name: "Cash", value: 5 }
  ],
  topPerformers: [
    { name: "US Tech Fund", value: "$1.24B", change: "+4.7%", isPositive: true },
    { name: "Treasury Notes", value: "$845M", change: "+1.2%", isPositive: true }
  ],
  topDetractors: [
    { name: "Real Estate Holdings", value: "$682M", change: "-2.1%", isPositive: false },
    { name: "Private Equity", value: "$456M", change: "+8.3%", isPositive: true }
  ],
  recommendations: [
    { text: "Rebalance your equity allocation to reduce risk", priority: "high" },
    { text: "Consider increasing fixed income exposure", priority: "medium" }
  ],
  recentNews: [
    { title: "Fed signals potential rate cut in December", time: "2h ago" },
    { title: "Tech stocks rally on positive earnings", time: "5h ago" }
  ]
};

// For backward compatibility with any code still using the individual exports
export const performanceTrendData = performanceData.performanceTrend;
export const assetAllocationData = performanceData.assetAllocation;
export const newsData = performanceData.recentNews;
export const recommendations = performanceData.recommendations;
export const chartConfig = {
  "value": {
    label: "Net Worth",
    color: "#000000"
  }
};
