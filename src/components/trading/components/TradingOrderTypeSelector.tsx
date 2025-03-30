
import React from "react";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
      <RadioGroup 
        value={orderType}
        onValueChange={(value) => setOrderType(value as OrderType)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className={`p-4 cursor-pointer transition-all ${orderType === 'buy' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="buy" id="buy" className="mr-2 mt-1" />
            <div>
              <Label htmlFor="buy" className="cursor-pointer font-medium flex items-center">
                <ArrowUp className="h-4 w-4 mr-2 text-green-600" />
                Buy
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Purchase securities to add to your portfolio.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className={`p-4 cursor-pointer transition-all ${orderType === 'sell' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="sell" id="sell" className="mr-2 mt-1" />
            <div>
              <Label htmlFor="sell" className="cursor-pointer font-medium flex items-center">
                <ArrowDown className="h-4 w-4 mr-2 text-red-600" />
                Sell
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Sell securities from your existing holdings.
              </p>
            </div>
          </div>
        </Card>
        
        <Card className={`p-4 cursor-pointer transition-all ${orderType === 'sell' && orderType === 'sellshort' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="sell" id="sellshort" className="mr-2 mt-1" />
            <div>
              <Label htmlFor="sellshort" className="cursor-pointer font-medium flex items-center">
                <Circle className="h-4 w-4 mr-2 text-amber-600" />
                Sell Short
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Borrow and sell securities anticipating price drop.
              </p>
            </div>
          </div>
        </Card>

        <Card className={`p-4 cursor-pointer transition-all ${orderType === 'sell' && orderType === 'exchange' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
          <div className="flex items-start">
            <RadioGroupItem value="sell" id="exchange" className="mr-2 mt-1" />
            <div>
              <Label htmlFor="exchange" className="cursor-pointer font-medium flex items-center">
                <RefreshCcw className="h-4 w-4 mr-2 text-blue-600" />
                Exchange
              </Label>
              <p className="text-sm text-gray-600 mt-1">
                Swap one security for another in a single transaction.
              </p>
            </div>
          </div>
        </Card>
      </RadioGroup>
    </div>
  );
};

export default TradingOrderTypeSelector;
