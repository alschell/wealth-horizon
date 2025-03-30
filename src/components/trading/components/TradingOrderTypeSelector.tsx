
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, RefreshCcw, Circle } from "lucide-react";
import { OrderType } from "../types";

interface TradingOrderTypeSelectorProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const TradingOrderTypeSelector: React.FC<TradingOrderTypeSelectorProps> = ({
  orderType,
  setOrderType
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-4">Order</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className={`p-4 cursor-pointer transition-all ${orderType === 'buy' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
          onClick={() => setOrderType('buy')}
        >
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <ArrowUp className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium text-center mb-2">Buy</h3>
            <p className="text-sm text-gray-600 text-center w-full">
              Purchase securities to add to your portfolio.
            </p>
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all ${orderType === 'sell' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
          onClick={() => setOrderType('sell')}
        >
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <ArrowDown className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-medium text-center mb-2">Sell</h3>
            <p className="text-sm text-gray-600 text-center w-full">
              Sell securities from your existing holdings.
            </p>
          </div>
        </Card>
        
        <Card 
          className={`p-4 cursor-pointer transition-all ${orderType === 'sell_short' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
          onClick={() => setOrderType('sell_short')}
        >
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <Circle className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="font-medium text-center mb-2">Sell Short</h3>
            <p className="text-sm text-gray-600 text-center w-full">
              Borrow and sell securities anticipating price drop.
            </p>
          </div>
        </Card>

        <Card 
          className={`p-4 cursor-pointer transition-all ${orderType === 'exchange' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
          onClick={() => setOrderType('exchange')}
        >
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <RefreshCcw className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-center mb-2">Exchange</h3>
            <p className="text-sm text-gray-600 text-center w-full">
              Swap one security for another in a single transaction.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TradingOrderTypeSelector;
