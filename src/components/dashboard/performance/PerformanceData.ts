
export const newsData = [
  {
    id: "news-1",
    title: "Federal Reserve signals potential rate cut in September",
    time: "2 hours ago"
  },
  {
    id: "news-2",
    title: "NVIDIA reports record quarterly earnings, stock surges 8%",
    time: "3 hours ago"
  },
  {
    id: "news-3",
    title: "ECB maintains current interest rates, cites inflation concerns",
    time: "5 hours ago"
  },
  {
    id: "news-4",
    title: "Oil prices rise amid Middle East tensions",
    time: "8 hours ago"
  },
  {
    id: "news-5",
    title: "JP Morgan announces strategic acquisition in fintech sector",
    time: "10 hours ago"
  },
  {
    id: "news-6",
    title: "Cryptocurrency market shows signs of recovery as Bitcoin climbs",
    time: "12 hours ago"
  },
  {
    id: "news-7",
    title: "US housing market data indicates cooling demand",
    time: "Yesterday"
  },
  {
    id: "news-8",
    title: "European Commission proposes new ESG disclosure requirements",
    time: "Yesterday"
  },
  {
    id: "news-9",
    title: "Major bank announces corporate restructuring plan",
    time: "2 days ago"
  },
  {
    id: "news-10",
    title: "Global supply chain disruptions continue to impact manufacturing",
    time: "2 days ago"
  },
  {
    id: "news-11",
    title: "Chinese economic data shows mixed signals for growth",
    time: "3 days ago"
  },
  {
    id: "news-12",
    title: "Tech giants face new regulatory challenges in EU market",
    time: "3 days ago"
  }
];

// Add the missing exports that are referenced in PerformanceOverview.tsx
export const performanceData = [
  { month: "Jan", value: 5200000 },
  { month: "Feb", value: 5250000 },
  { month: "Mar", value: 5400000 },
  { month: "Apr", value: 5350000 },
  { month: "May", value: 5500000 },
  { month: "Jun", value: 5600000 },
  { month: "Jul", value: 5650000 },
  { month: "Aug", value: 5750000 },
  { month: "Sep", value: 5720000 },
  { month: "Oct", value: 5850000 },
  { month: "Nov", value: 5920000 },
  { month: "Dec", value: 6000000 }
];

export const assetAllocationData = [
  { name: "Equities", value: 42, color: "#000000" },
  { name: "Fixed Income", value: 28, color: "#777777" },
  { name: "Real Estate", value: 15, color: "#aaaaaa" },
  { name: "Alternative Investments", value: 10, color: "#555555" },
  { name: "Cash", value: 5, color: "#cccccc" }
];

export const recommendations = [
  {
    id: "rec-1",
    title: "Increase fixed income allocation",
    description: "Increasing your fixed income allocation by 5% would improve your portfolio's risk-adjusted return.",
    impact: "Medium",
    category: "Asset Allocation",
    impactValue: 3.2,
    urgency: "medium" as "medium", // Explicitly typed as a literal
    action: "Review Allocation"
  },
  {
    id: "rec-2",
    title: "Review concentrated positions",
    description: "Your technology sector exposure exceeds 30% of your equity portfolio, consider diversifying.",
    impact: "High",
    category: "Risk Management",
    impactValue: 5.7,
    urgency: "high" as "high", // Explicitly typed as a literal
    action: "Diversify Now"
  },
  {
    id: "rec-3",
    title: "Tax-loss harvesting opportunity",
    description: "Current market conditions present an opportunity for tax-loss harvesting in your international equity positions.",
    impact: "Medium",
    category: "Tax Optimization",
    impactValue: 2.8,
    urgency: "medium" as "medium", // Explicitly typed as a literal
    action: "Harvest Losses"
  },
  {
    id: "rec-4",
    title: "Term deposit rates favorable",
    description: "Current interest rates for 6-month term deposits are at 4.75%, consider allocating excess cash.",
    impact: "Low",
    category: "Cash Management",
    impactValue: 1.5,
    urgency: "low" as "low", // Explicitly typed as a literal
    action: "Allocate Cash"
  }
];

export const chartConfig = {
  colors: ["#000000", "#555555"],
  tooltip: {
    enabled: true,
    format: "${value}"
  },
  xAxis: {
    visible: true,
    labels: {
      enabled: true
    }
  },
  yAxis: {
    visible: true,
    labels: {
      format: "${value}"
    }
  }
};
