
import React from "react";
import AssetAllocationChart from "./AssetAllocationChart";
import PortfolioPerformanceChart from "./PortfolioPerformanceChart";
import { Card, CardContent } from "@/components/ui/card";

type ChartsTabContentProps = {
  assetAllocationData: {
    name: string;
    value: number;
  }[];
};

const ChartsTabContent = ({ assetAllocationData }: ChartsTabContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold mb-2">Total Assets</div>
            <div className="text-3xl font-bold">$7.45M</div>
            <div className="text-sm text-gray-500 mt-1">+3.2% YTD</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-lg font-semibold mb-2">Total Liabilities</div>
            <div className="text-3xl font-bold text-gray-700">$1.77M</div>
            <div className="text-sm text-gray-500 mt-1">-2.5% YTD</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Asset Allocation</h3>
        <div className="h-[250px]">
          <AssetAllocationChart assetAllocationData={assetAllocationData} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Liability Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-1">Mortgages</div>
              <div className="text-xl font-bold">$1.25M</div>
              <div className="text-xs text-gray-500">70.6% of liabilities</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-1">Lines of Credit</div>
              <div className="text-xl font-bold">$320K</div>
              <div className="text-xs text-gray-500">18.1% of liabilities</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-medium mb-1">Other Debt</div>
              <div className="text-xl font-bold">$200K</div>
              <div className="text-xs text-gray-500">11.3% of liabilities</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChartsTabContent;
