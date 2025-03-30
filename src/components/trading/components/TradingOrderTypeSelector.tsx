
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
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
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="font-medium text-gray-700 text-xl mr-2">Order:</span>
        <div className="flex gap-4">
          <Button
            type="button"
            className={`relative flex items-center gap-2 px-5 py-2.5 text-sm rounded-md transition-all ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            onClick={() => setOrderType('buy')}
          >
            <ArrowDownRight className="h-4 w-4" />
            <span>Buy</span>
          </Button>

          <Button
            type="button"
            className={`relative flex items-center gap-2 px-5 py-2.5 text-sm rounded-md transition-all ${orderType === 'sell' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            onClick={() => setOrderType('sell')}
          >
            <ArrowUpRight className="h-4 w-4" />
            <span>Sell</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingOrderTypeSelector;
