
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
    <div className="p-3 border rounded-md">
      <div className="flex flex-col mb-2">
        <h5 className="text-sm font-medium">{portfolio.name}</h5>
      </div>
      
      <div className="space-y-2">
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
            onClick={() => onAllocationChange(portfolio.id, remainingQuantity > 0 ? remainingQuantity : 0)}
          >
            Max
          </Button>
        </div>
        
        {allocation > 0 && (
          <p className="text-sm text-gray-600">
            Est. value: {estimatedValue.toLocaleString('en-US', {
              style: 'currency', 
              currency
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioItem;
