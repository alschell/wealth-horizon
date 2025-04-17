
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketItem } from "@/types/market";
import { getCountryFlagCode } from "../utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AssetPerformanceChart from "../../performance/AssetPerformanceChart";

interface MarketItemsGridProps {
  items: MarketItem[];
}

const MarketItemsGrid: React.FC<MarketItemsGridProps> = ({ items }) => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  
  const handleItemClick = (item: MarketItem) => {
    // Convert market item to asset format expected by AssetPerformanceChart
    const asset = {
      id: item.id,
      name: item.label,
      value: item.value,
      change: item.change,
      isPositive: parseFloat(item.change) >= 0
    };
    
    setSelectedAsset(asset);
    setIsChartOpen(true);
  };
  
  const getTabForCategory = (category: string): string => {
    switch (category) {
      case "Indices":
        return "indices";
      case "Cryptocurrencies":
        return "crypto";
      case "Currencies":
        return "forex";
      case "Commodities":
        return "commodities";
      default:
        return "overview";
    }
  };
  
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-sm">No market items selected</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 w-full">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="p-3 rounded-md bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center mb-1">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                {/* Use flag for indices and currencies */}
                {(item.category === "Indices" || item.category === "Currencies") ? (
                  <img 
                    src={`https://flagcdn.com/w20/${getCountryFlagCode(item.category, item.label)}.png`} 
                    alt={`${item.label} flag`}
                    className="w-5 h-auto"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  // Use emoji or symbol for other categories
                  <span className="text-lg">
                    {item.category === "Cryptocurrencies" ? "₿" : 
                     item.category === "Commodities" && item.label === "Gold" ? "🥇" : "🛢️"}
                  </span>
                )}
              </span>
              <p className="text-sm font-medium">{item.label}</p>
            </div>
            <div className="flex flex-col ml-8">
              <p className="text-sm font-mono font-bold">{item.value}</p>
              <p className={`text-xs font-medium ${
                parseFloat(item.change) >= 0 ? 'text-emerald-600' : 'text-red-500'
              }`}>
                {item.change}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Asset Performance Chart Dialog */}
      <Dialog open={isChartOpen} onOpenChange={setIsChartOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {selectedAsset?.name} Performance
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <AssetPerformanceChart asset={selectedAsset} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MarketItemsGrid;
