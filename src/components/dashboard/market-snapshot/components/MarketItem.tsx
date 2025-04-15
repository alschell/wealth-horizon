
import React from "react";
import { Card } from "@/components/ui/card";
import { getChangeColorClass, getChangeIcon } from "../utils";

export interface MarketItemProps {
  name: string;
  ticker: string;
  value: string;
  change: string;
  changePercent: number;
  isUp: boolean;
  category: string;
}

const MarketItem: React.FC<MarketItemProps> = ({
  name,
  ticker,
  value,
  change,
  changePercent,
  isUp,
  category
}) => {
  const ChangeIcon = getChangeIcon(isUp);
  const changeColorClass = getChangeColorClass(isUp);
  
  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium text-sm">{name}</h3>
            <p className="text-muted-foreground text-xs">{ticker}</p>
          </div>
          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="text-xl font-semibold">{value}</div>
          <div className="flex items-center">
            <ChangeIcon className={`h-4 w-4 ${changeColorClass} mr-1`} />
            <span className={`${changeColorClass} text-sm mr-1`}>
              {change}
            </span>
            <span className={`${changeColorClass} text-xs`}>
              ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MarketItem;
