
import React from "react";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import { OrderType } from "../types";

interface TradingFormHeaderProps {
  orderType: OrderType;
  setOrderType: (orderType: OrderType) => void;
}

const TradingFormHeader: React.FC<TradingFormHeaderProps> = ({
  orderType,
  setOrderType
}) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        type="button"
        className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors ${
          orderType === "buy" 
            ? "bg-green-600 text-white hover:bg-green-700" 
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
        onClick={() => setOrderType("buy")}
      >
        <TrendingUp className="mr-2 h-5 w-5" />
        Buy
      </button>
      <button
        type="button"
        className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors ${
          orderType === "sell" 
            ? "bg-red-600 text-white hover:bg-red-700" 
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
        onClick={() => setOrderType("sell")}
      >
        <ArrowDownUp className="mr-2 h-5 w-5" />
        Sell
      </button>
    </div>
  );
};

export default TradingFormHeader;
