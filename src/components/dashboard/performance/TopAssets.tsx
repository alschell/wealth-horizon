
import React from "react";
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

const TopAssets = () => {
  const navigate = useNavigate();
  
  const assets = [
    { id: "tech-fund", name: "US Tech Fund", value: "$1.24B", change: "+4.7%", isPositive: true },
    { id: "treasury", name: "Treasury Notes", value: "$845M", change: "+1.2%", isPositive: true },
    { id: "real-estate", name: "Real Estate Holdings", value: "$682M", change: "-2.1%", isPositive: false },
    { id: "private-equity", name: "Private Equity", value: "$456M", change: "+8.3%", isPositive: true },
    { id: "global-bonds", name: "Global Bond Fund", value: "$378M", change: "+0.9%", isPositive: true },
    { id: "commodities", name: "Commodities", value: "$215M", change: "+3.2%", isPositive: true },
    { id: "hedge-fund", name: "Hedge Fund Alpha", value: "$189M", change: "-1.5%", isPositive: false },
    { id: "emerging-markets", name: "Emerging Markets", value: "$132M", change: "+5.7%", isPositive: true },
  ];
  
  const handleAssetClick = (assetId: string) => {
    navigate(`/analyze-wealth/asset/${assetId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <SectionHeader title="Top Assets" />
      </div>
      
      <ScrollArea className="flex-grow">
        <div className="space-y-3">
          {assets.map((asset, index) => (
            <div 
              key={index} 
              className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleAssetClick(asset.id)}
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
      </ScrollArea>
      
      <div className="mt-auto pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={() => navigate("/analyze-wealth")}
        >
          View All Assets
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default TopAssets;
