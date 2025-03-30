
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { AlertCircle, DollarSign } from "lucide-react";

interface TradingValiditySelectionProps {
  timeInForce: string;
  setTimeInForce: (value: string) => void;
  orderExecutionType: string;
  setOrderExecutionType: (value: string) => void;
  orderType: string;
}

const TradingValiditySelection: React.FC<TradingValiditySelectionProps> = ({
  timeInForce,
  setTimeInForce,
  orderExecutionType,
  setOrderExecutionType,
  orderType
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Order Execution</h3>
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Order Type
              </label>
              <Select
                value={orderExecutionType}
                onValueChange={setOrderExecutionType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="stop">Stop Order</SelectItem>
                    <SelectItem value="stop_limit">Stop Limit Order</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {orderExecutionType === "market" && "Execute immediately at current market price."}
                {orderExecutionType === "limit" && 
                  `Execute only at specified price or better. ${
                    orderType === "buy" ? "Buy at maximum price" : "Sell at minimum price"
                  }.`
                }
                {orderExecutionType === "stop" && 
                  `Becomes market order when price crosses specified stop price. ${
                    orderType === "buy" ? "Buy above" : "Sell below"
                  } stop price.`
                }
                {orderExecutionType === "stop_limit" && 
                  `Becomes limit order when price crosses specified stop price. ${
                    orderType === "buy" ? "Buy above" : "Sell below"
                  } stop price at limit.`
                }
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Time in Force
              </label>
              <Select value={timeInForce} onValueChange={setTimeInForce}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select time in force" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="day">Day Order</SelectItem>
                    <SelectItem value="gtc">Good Till Canceled (GTC)</SelectItem>
                    <SelectItem value="gtd">Good Till Date (GTD)</SelectItem>
                    <SelectItem value="ioc">Immediate or Cancel (IOC)</SelectItem>
                    <SelectItem value="fok">Fill or Kill (FOK)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {timeInForce === "day" && "Order valid until end of current trading day."}
                {timeInForce === "gtc" && "Order valid until executed or canceled."}
                {timeInForce === "gtd" && "Order valid until specified date."}
                {timeInForce === "ioc" && "Fill whatever portion possible immediately, cancel rest."}
                {timeInForce === "fok" && "Must be filled immediately and completely or canceled."}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {orderType === "sell_short" && (
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Short Selling Requirements</h4>
              <p className="text-sm text-amber-700 mt-1">
                Short selling involves borrowing securities to sell in the market. Ensure your account has margin capabilities and there is borrowable inventory for the selected instrument. Additional fees and margin requirements apply.
              </p>
            </div>
          </div>
        </div>
      )}

      {orderType === "exchange" && (
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <div className="flex">
            <DollarSign className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800">Exchange Order Information</h4>
              <p className="text-sm text-blue-700 mt-1">
                Exchange orders allow you to swap one security for another in a single transaction. You'll need to specify both the security to sell and the security to buy. Tax implications will be calculated as if you sold and then purchased separately.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingValiditySelection;
