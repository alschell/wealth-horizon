
export const getRiskColor = (value: number): string => {
  if (value < 20) return "bg-gray-400";
  if (value < 40) return "bg-gray-500";
  if (value < 60) return "bg-gray-600";
  if (value < 80) return "bg-gray-700";
  return "bg-gray-900";
};

export const riskMetricsData = [
  {
    label: "Overall Risk Score",
    score: 68,
    change: "+2",
    color: "bg-gray-700",
    tooltip: "Based on asset volatility, concentration, and correlation"
  },
  {
    label: "Volatility (3Y)",
    score: 12.4,
    unit: "%",
    change: "-0.8",
    changeDirection: "down" as const,
    tooltip: "Standard deviation of returns"
  },
  {
    label: "Drawdown Risk",
    score: 18.2,
    unit: "%",
    change: "+1.5",
    changeDirection: "up" as const,
    tooltip: "Maximum potential loss in adverse scenarios"
  },
  {
    label: "VaR (95%)",
    score: 7.5,
    unit: "%",
    change: "+0.3",
    changeDirection: "up" as const,
    tooltip: "Value at Risk - potential loss in 95% of scenarios"
  }
];

export const exposureRisksData = [
  { name: "Currency Risk", value: 32, warning: "High EUR exposure" },
  { name: "Geographic Risk", value: 28, warning: "Emerging markets concentration" },
  { name: "Sector Risk", value: 65, warning: "Technology sector overweight" },
  { name: "Liquidity Risk", value: 15, warning: null },
  { name: "Interest Rate Risk", value: 42, warning: "Long duration bonds" }
];
