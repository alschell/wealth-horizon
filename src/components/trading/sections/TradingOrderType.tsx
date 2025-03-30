
import React from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderType } from "../types";

interface TradingOrderTypeProps {
  orderType: OrderType;
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (time: string) => void;
  [key: string]: any;
}

const TradingOrderType: React.FC<TradingOrderTypeProps> = ({
  orderType,
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">
          Execution Type <span className="text-red-500">*</span>
        </h3>
        <div className="space-y-4">
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'market' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('market')}
          >
            <div className="flex items-start">
              <div className="w-full">
                <div className="font-medium">Market Order</div>
                <p className="text-sm text-gray-600 mt-1">
                  Execute at the current market price. The order is filled immediately at the best available price.
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'limit' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('limit')}
          >
            <div className="flex items-start">
              <div className="w-full">
                <div className="font-medium">Limit Order</div>
                <p className="text-sm text-gray-600 mt-1">
                  Execute at a specified price or better. The order will only be filled at your price or better.
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'stop' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('stop')}
          >
            <div className="flex items-start">
              <div className="w-full">
                <div className="font-medium">Stop Order</div>
                <p className="text-sm text-gray-600 mt-1">
                  Becomes a market order when a specified price is reached. Helps limit losses or protect profits.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium">Time in Force</h3>
          <span className="text-red-500">*</span>
        </div>
        
        <Select value={timeInForce} onValueChange={setTimeInForce}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day Only (expires at end of trading day)</SelectItem>
            <SelectItem value="gtc">Good Till Canceled (GTC)</SelectItem>
            <SelectItem value="fok">Fill or Kill (FOK)</SelectItem>
            <SelectItem value="ioc">Immediate or Cancel (IOC)</SelectItem>
          </SelectContent>
        </Select>
        
        <p className="text-sm text-gray-500 mt-2">
          {timeInForce === 'day' && "Order will be active until the end of the current trading day."}
          {timeInForce === 'gtc' && "Order will remain active until it is executed or you cancel it."}
          {timeInForce === 'fok' && "Order must be filled immediately in its entirety or it will be canceled."}
          {timeInForce === 'ioc' && "Any portion of the order that cannot be filled immediately will be canceled."}
        </p>
      </div>
    </div>
  );
};

export default TradingOrderType;
