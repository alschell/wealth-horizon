
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const TopAssets = () => {
  const navigate = useNavigate();
  
  const topAssets = [
    {
      id: "us-tech-fund",
      name: "US Tech Fund",
      value: "$1.24B",
      change: "+4.7%",
      isPositive: true
    },
    {
      id: "treasury-notes",
      name: "Treasury Notes",
      value: "$845M",
      change: "+1.2%",
      isPositive: true
    },
    {
      id: "real-estate",
      name: "Real Estate Holdings",
      value: "$682M",
      change: "-2.1%",
      isPositive: false
    },
    {
      id: "private-equity",
      name: "Private Equity",
      value: "$456M",
      change: "+8.3%",
      isPositive: true
    }
  ];
  
  const handleAssetClick = (assetId: string) => {
    navigate(`/analyze-wealth/asset/${assetId}`);
  };

  return (
    <div className="relative h-full">
      <div className="space-y-3 max-h-[300px] overflow-y-auto pb-16">
        {topAssets.map((asset) => (
          <div 
            key={asset.id}
            className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleAssetClick(asset.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-semibold">{asset.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{asset.value}</p>
              </div>
              <span className={`text-sm font-medium ${asset.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {asset.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-white pt-2 border-t pb-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={() => navigate('/analyze-wealth')}
        >
          View All Assets
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default TopAssets;
