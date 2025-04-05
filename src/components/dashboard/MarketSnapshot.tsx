
import React from "react";
import MarketDataWidget from "@/components/market/components/MarketDataWidget";

const MarketSnapshot = () => {
  // Define market indices for the snapshot view - expanded to top 10
  const indices = [
    {
      name: "S&P 500",
      value: "4,587.20",
      change: 0.85,
    },
    {
      name: "NASDAQ",
      value: "14,346.30",
      change: 1.2,
    },
    {
      name: "Dow Jones",
      value: "32,627.80",
      change: 0.45,
    },
    {
      name: "FTSE 100",
      value: "6,952.30",
      change: -0.22,
    },
    {
      name: "DAX",
      value: "14,688.40",
      change: 0.31,
    },
    {
      name: "Nikkei 225",
      value: "29,176.70",
      change: 1.34,
    },
    {
      name: "Shanghai Comp",
      value: "3,442.61",
      change: -0.92,
    },
    {
      name: "Hang Seng",
      value: "28,750.83",
      change: -1.28,
    },
    {
      name: "ASX 200",
      value: "6,821.20",
      change: 0.27,
    },
    {
      name: "CAC 40",
      value: "5,997.96",
      change: 0.42,
    },
  ];

  return (
    <MarketDataWidget 
      indices={indices}
      title="Market Snapshot"
      maxNewsItems={0} // Don't show news in the snapshot
    />
  );
};

export default MarketSnapshot;
