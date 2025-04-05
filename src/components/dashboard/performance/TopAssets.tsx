
import React from "react";
import { ArrowUp, ArrowDown, Briefcase, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TopAssets = () => {
  const assets = [
    { name: "US Tech Fund", value: "$1.24B", change: "+4.7%", isPositive: true, details: "Technology sector ETF" },
    { name: "Treasury Notes", value: "$845M", change: "+1.2%", isPositive: true, details: "US government bonds" },
    { name: "Real Estate Holdings", value: "$682M", change: "-2.1%", isPositive: false, details: "Commercial property" },
    { name: "Private Equity", value: "$456M", change: "+8.3%", isPositive: true, details: "Late-stage growth investments" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium flex items-center">
          <Briefcase className="h-4 w-4 mr-1 text-gray-500" /> Top Assets
        </h3>
        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
          View all
        </Button>
      </div>
      <div className="space-y-3">
        {assets.map((asset, index) => (
          <div 
            key={index} 
            className="p-3 rounded-md border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all bg-white dark:bg-gray-800 group"
          >
            <div className="flex justify-between items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm font-medium cursor-help">{asset.name}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{asset.details}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-sm font-bold">{asset.value}</p>
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-xs flex items-center ${asset.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {asset.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {asset.change}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs p-0 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Details
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
          View All Assets
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default TopAssets;
