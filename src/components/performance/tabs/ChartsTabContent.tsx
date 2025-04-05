
import React from "react";
import AssetAllocationChart from "../charts/AssetAllocationChart";
import PortfolioPerformanceChart from "../charts/PortfolioPerformanceChart";

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
