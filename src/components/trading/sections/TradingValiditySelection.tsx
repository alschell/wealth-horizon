
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, AlertCircle, CalendarClock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface TradingValiditySelectionProps {
  timeInForce: string;
  setTimeInForce: (value: string) => void;
  orderExecutionType: string;
  leverage: number;
  setLeverage: (value: number) => void;
  [key: string]: any;
}

const TradingValiditySelection: React.FC<TradingValiditySelectionProps> = ({
  timeInForce,
  setTimeInForce,
  orderExecutionType,
  leverage,
  setLeverage
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-md font-medium">Order Validity</h3>
        <p className="text-sm text-gray-600">
          Select how long your {orderExecutionType} order should remain active.
        </p>
        
        <RadioGroup 
          value={timeInForce} 
          onValueChange={setTimeInForce}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
        >
          <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'day' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
            <div className="flex items-start">
              <RadioGroupItem value="day" id="day" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="day" className="cursor-pointer font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  Day Order
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Order is valid until the end of the current trading day.
                </p>
              </div>
            </div>
          </Card>

          <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'gtc' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
            <div className="flex items-start">
              <RadioGroupItem value="gtc" id="gtc" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="gtc" className="cursor-pointer font-medium flex items-center">
                  <CalendarClock className="h-4 w-4 mr-2 text-indigo-600" />
                  Good Till Canceled (GTC)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Order remains active until explicitly canceled.
                </p>
              </div>
            </div>
          </Card>

          <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'fok' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
            <div className="flex items-start">
              <RadioGroupItem value="fok" id="fok" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="fok" className="cursor-pointer font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                  Fill or Kill (FOK)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Order must be filled immediately in its entirety or canceled.
                </p>
              </div>
            </div>
          </Card>

          <Card className={`p-4 cursor-pointer transition-all ${timeInForce === 'ioc' ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}>
            <div className="flex items-start">
              <RadioGroupItem value="ioc" id="ioc" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="ioc" className="cursor-pointer font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-600" />
                  Immediate or Cancel (IOC)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Fills all or part of the order immediately, then cancels any unfilled portion.
                </p>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <h3 className="text-md font-medium">Leverage Options</h3>
        <p className="text-sm text-gray-600">
          Apply leverage to increase your buying power. <span className="text-amber-600 font-medium">Higher leverage increases risk.</span>
        </p>
        
        <div className="pt-2">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Leverage: {leverage}x</span>
            <Badge variant={leverage > 2 ? "destructive" : leverage > 1 ? "outline" : "secondary"}>
              {leverage === 1 ? "No Leverage" : leverage > 5 ? "High Risk" : "With Leverage"}
            </Badge>
          </div>
          <Slider 
            defaultValue={[leverage]} 
            min={1} 
            max={10} 
            step={1} 
            onValueChange={([value]) => setLeverage(value)}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1x (No Leverage)</span>
            <span>5x</span>
            <span>10x (Max)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingValiditySelection;
