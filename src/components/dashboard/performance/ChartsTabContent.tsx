
import React from "react";
import AssetAllocationChart from "./AssetAllocationChart";
import PortfolioPerformanceChart from "./PortfolioPerformanceChart";

type ChartsTabContentProps = {
  assetAllocationData: {
    name: string;
    value: number;
  }[];
};

const ChartsTabContent = ({ assetAllocationData }: ChartsTabContentProps) => {
  return (
    <div className="space-y-6">
      <AssetAllocationChart assetAllocationData={assetAllocationData} />
      <PortfolioPerformanceChart />
    </div>
  );
};

export default ChartsTabContent;
