
import React from "react";
import MarketDataWidget from "@/components/market/components/MarketDataWidget";

const MarketSnapshot = () => {
  // Define market indices for the snapshot view
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
