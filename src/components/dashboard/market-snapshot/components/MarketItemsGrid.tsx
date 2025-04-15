
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarketItem from "./MarketItem";
import { MarketItem as MarketItemType } from "../types";

interface MarketItemsGridProps {
  items: MarketItemType[];
}

const MarketItemsGrid: React.FC<MarketItemsGridProps> = ({ items }) => {
  return (
    <ScrollArea className="flex-1 -mr-4 pr-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <MarketItem key={index} item={item} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default MarketItemsGrid;
