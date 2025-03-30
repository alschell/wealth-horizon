
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
        <span className="font-medium text-gray-700 text-lg mr-2">Order Type:</span>
        <div className="flex gap-4">
          <Button
            type="button"
            size="lg"
            className={`relative flex items-center gap-3 px-6 py-3 h-14 text-base rounded-md transition-all ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            onClick={() => setOrderType('buy')}
          >
            <ArrowDownRight className="h-5 w-5" />
            <span>Buy</span>
          </Button>

          <Button
            type="button"
            size="lg"
            className={`relative flex items-center gap-3 px-6 py-3 h-14 text-base rounded-md transition-all ${orderType === 'sell' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            onClick={() => setOrderType('sell')}
          >
            <ArrowUpRight className="h-5 w-5" />
            <span>Sell</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingOrderTypeSelector;
