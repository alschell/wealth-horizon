
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TradingOrderTypeProps {
  orderExecutionType: string;
  setOrderExecutionType: (type: string) => void;
  timeInForce: string;
  setTimeInForce: (timeInForce: string) => void;
}

const TradingOrderType: React.FC<TradingOrderTypeProps> = ({
  orderExecutionType,
  setOrderExecutionType,
  timeInForce,
  setTimeInForce
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-2">
          Order <span className="text-red-500">*</span>
        </h2>
        <p className="text-sm text-gray-600">Select order execution type and time-in-force.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Execution Type</h3>
          
          <RadioGroup 
            defaultValue={orderExecutionType}
            value={orderExecutionType}
            onValueChange={setOrderExecutionType}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="market" id="market" />
              <Label htmlFor="market" className="cursor-pointer">Market</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="limit" id="limit" />
              <Label htmlFor="limit" className="cursor-pointer">Limit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stop" id="stop" />
              <Label htmlFor="stop" className="cursor-pointer">Stop</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="stop-limit" id="stop-limit" />
              <Label htmlFor="stop-limit" className="cursor-pointer">Stop-Limit</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Time in Force</h3>
          
          <RadioGroup 
            defaultValue={timeInForce}
            value={timeInForce}
            onValueChange={setTimeInForce}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="day" id="day" />
              <Label htmlFor="day" className="cursor-pointer">Day</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="gtc" id="gtc" />
              <Label htmlFor="gtc" className="cursor-pointer">Good Till Cancelled (GTC)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ioc" id="ioc" />
              <Label htmlFor="ioc" className="cursor-pointer">Immediate or Cancel (IOC)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fok" id="fok" />
              <Label htmlFor="fok" className="cursor-pointer">Fill or Kill (FOK)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default TradingOrderType;
