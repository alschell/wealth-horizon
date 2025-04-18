
import React from "react";
import { ArrowUp, ArrowDown, Briefcase, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <div 
            key={index} 
            className="p-3 rounded-md border border-gray-100 hover:shadow-sm transition-shadow bg-white"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">{asset.name}</p>
              <p className="text-sm font-bold">{asset.value}</p>
            </div>
            <div className="flex justify-end mt-1">
              <span className={`text-xs flex items-center ${asset.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {asset.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {asset.change}
              </span>
            </div>
          </div>
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
