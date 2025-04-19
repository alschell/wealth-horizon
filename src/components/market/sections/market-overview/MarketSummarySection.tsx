
import React from 'react';
import { MarketSummaryCard } from '../../components/MarketSummaryCard';

interface MarketSummaryProps {
  marketData: Array<{
    name: string;
    value: string;
    change: number;
    color: string;
  }>;
}

export const MarketSummarySection: React.FC<MarketSummaryProps> = ({ marketData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MarketSummaryCard 
        title="Today's Markets"
        subtitle="Major indices overview"
        data={marketData.slice(0, 3)}
      />
      <MarketSummaryCard 
        title="Global Markets"
        subtitle="International indices"
        data={marketData.slice(3, 6)}
      />
      <AssetClassesCard assetClasses={[
        { name: "Equities", value: 2.1, color: "#555555" },
        { name: "Fixed Income", value: -0.3, color: "#777777" },
        { name: "Commodities", value: 1.5, color: "#555555" },
        { name: "Currencies", value: -0.2, color: "#777777" },
        { name: "Crypto", value: 3.5, color: "#555555" },
      ]} />
    </div>
  );
};
