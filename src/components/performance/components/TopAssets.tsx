
import React from "react";
import { Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AssetItem from "./assets/AssetItem";

const TopAssets = () => {
  const assets = [
    { name: "US Tech Fund", value: "$1.24B", change: "+4.7%", isPositive: true },
    { name: "Treasury Notes", value: "$845M", change: "+1.2%", isPositive: true },
    { name: "Real Estate Holdings", value: "$682M", change: "-2.1%", isPositive: false },
    { name: "Private Equity", value: "$456M", change: "+8.3%", isPositive: true },
  ];

  return (
    <div className="space-y-2 flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium flex items-center">
          <Briefcase className="h-4 w-4 mr-1 text-gray-500" /> Top Assets
        </h3>
        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
          View all
        </Button>
      </div>
      
      <div className="space-y-2 flex-grow">
        {assets.map((asset, index) => (
          <AssetItem key={index} asset={asset} />
        ))}
      </div>
      
      <div className="mt-auto pt-4">
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
          View All Assets
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default TopAssets;
