
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Portfolio } from "@/components/trading/types";

interface PortfolioItemProps {
  portfolio: Portfolio;
  allocation: number;
  instrumentPrice: number;
  currency: string;
  remainingQuantity: number;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  portfolio,
  allocation,
  instrumentPrice,
  currency,
  remainingQuantity,
  onAllocationChange
}) => {
  const estimatedValue = allocation * instrumentPrice;
  
  return (
    <div className="p-4 border rounded-md hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="col-span-1">
          <h3 className="font-medium text-gray-900">{portfolio.name}</h3>
          <p className="text-sm text-gray-500">Portfolio</p>
        </div>
        
        <div className="col-span-1">
          <p className="text-sm font-medium text-gray-700 mb-1">Est. value:</p>
          <p className="text-sm text-gray-900">
            {estimatedValue.toLocaleString('en-US', {
              style: 'currency', 
              currency
            })}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="0"
          value={allocation}
          onChange={(e) => onAllocationChange(portfolio.id, Number(e.target.value))}
          className="w-full"
          placeholder="Number of shares"
        />
        <Button
          variant="outline"
          size="sm"
          className="whitespace-nowrap"
          onClick={() => onAllocationChange(portfolio.id, remainingQuantity > 0 ? allocation + remainingQuantity : allocation)}
        >
          Max
        </Button>
      </div>
    </div>
  );
};

export default PortfolioItem;
