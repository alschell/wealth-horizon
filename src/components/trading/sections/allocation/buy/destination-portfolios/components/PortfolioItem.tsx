
import React from "react";
import { Portfolio } from "@/components/trading/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PortfolioItemProps {
  portfolio: Portfolio;
  currentQuantity: number;
  instrumentPrice: number;
  currency: string;
  remainingQuantity: number;
  onAllocationChange: (portfolioId: string, quantity: number) => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({
  portfolio,
  currentQuantity,
  instrumentPrice,
  currency,
  remainingQuantity,
  onAllocationChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAllocationChange(portfolio.id, Number(e.target.value) || 0);
  };

  const handleMaxClick = () => {
    onAllocationChange(portfolio.id, currentQuantity + remainingQuantity);
  };

  const estimatedValue = currentQuantity * instrumentPrice;

  return (
    <div className={`p-4 border rounded-md ${currentQuantity > 0 ? 'bg-gray-50 border-gray-400' : 'bg-white border-gray-200'} transition-colors`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-medium">{portfolio.name}</h4>
          <p className="text-xs text-gray-500">Portfolio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mt-2">
        <div>
          <div className="text-xs text-gray-500 mb-1">Shares to allocate</div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="0"
              value={currentQuantity || ""}
              onChange={handleInputChange}
              className="w-full"
              placeholder="0"
            />
            {remainingQuantity > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={handleMaxClick}
              >
                Max
              </Button>
            )}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">Estimated value</div>
          <div className="text-sm font-medium">
            {estimatedValue.toLocaleString('en-US', {
              style: 'currency',
              currency
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
