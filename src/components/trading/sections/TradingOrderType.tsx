
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { AlertCircle, Clock } from "lucide-react";
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
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Order type determines how your trade is executed. Market orders execute immediately at the best available price, 
            while limit orders only execute at or better than your specified price.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Execution Type</h3>
        <RadioGroup 
          value={orderExecutionType} 
          onValueChange={setOrderExecutionType}
          className="space-y-4"
        >
          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'market' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('market')}
          >
            <div className="flex items-start">
              <RadioGroupItem value="market" id="market" className="mr-2" />
              <Label htmlFor="market" className="cursor-pointer font-medium w-full">
                Market Order
                <p className="font-normal text-sm text-gray-600 mt-1">
                  Execute immediately at the best available market price. Best used when execution speed is your priority.
                </p>
              </Label>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'limit' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('limit')}
          >
            <div className="flex items-start">
              <RadioGroupItem value="limit" id="limit" className="mr-2" />
              <Label htmlFor="limit" className="cursor-pointer font-medium w-full">
                Limit Order
                <p className="font-normal text-sm text-gray-600 mt-1">
                  Execute only at your specified price or better. Best used when price is your priority.
                </p>
              </Label>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${orderExecutionType === 'stop' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => setOrderExecutionType('stop')}
          >
            <div className="flex items-start">
              <RadioGroupItem value="stop" id="stop" className="mr-2" />
              <Label htmlFor="stop" className="cursor-pointer font-medium w-full">
                Stop Order
                <p className="font-normal text-sm text-gray-600 mt-1">
                  Becomes a market order when price reaches or passes your stop price. Used to limit losses or protect profits.
                </p>
              </Label>
            </div>
          </Card>
        </RadioGroup>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-medium">Time in Force</h3>
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
