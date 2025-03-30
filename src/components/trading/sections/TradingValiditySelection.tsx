
import React, { useCallback } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shield, TrendingUp, AlertCircle, DollarSign } from "lucide-react";
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
  leverage,
  setLeverage,
  orderType
}) => {
  // Memoized leverage handler to prevent unnecessary re-renders
  const handleLeverageChange = useCallback((value: number) => {
    setLeverage(value);
  }, [setLeverage]);

  // Memoized slider handler to prevent unnecessary re-renders
  const handleSliderChange = useCallback((values: number[]) => {
    if (values.length > 0 && values[0] !== leverage) {
      setLeverage(values[0]);
    }
  }, [leverage, setLeverage]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          {orderType === "buy" 
            ? "Apply leverage to increase your buying power and potential returns." 
            : "Apply leverage for short positions to increase potential returns."}
          <span className="text-amber-600 font-medium"> Higher leverage increases both potential returns and risks.</span>
        </p>

        <RadioGroup 
          value={leverage.toString()} 
          onValueChange={(value) => handleLeverageChange(Number(value))}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4"
        >
          <Card 
            className={`p-4 cursor-pointer transition-all ${leverage === 1 ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => handleLeverageChange(1)}
          >
            <div className="flex items-start">
              <RadioGroupItem value="1" id="leverage-1" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="leverage-1" className="cursor-pointer font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-600" />
                  No Leverage (1x)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Standard trading with your available capital.
                </p>
                <Badge variant="secondary" className="mt-2">Conservative</Badge>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${leverage === 2 ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => handleLeverageChange(2)}
          >
            <div className="flex items-start">
              <RadioGroupItem value="2" id="leverage-2" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="leverage-2" className="cursor-pointer font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                  Moderate (2x)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Double your buying power with moderate risk.
                </p>
                <Badge variant="outline" className="mt-2">Standard</Badge>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${leverage === 5 ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
            onClick={() => handleLeverageChange(5)}
          >
            <div className="flex items-start">
              <RadioGroupItem value="5" id="leverage-5" className="mr-2 mt-1" />
              <div>
                <Label htmlFor="leverage-5" className="cursor-pointer font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
                  Advanced (5x)
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  Quintuple your position size with higher risk.
                </p>
                <Badge variant="destructive" className="mt-2">High Risk</Badge>
              </div>
            </div>
          </Card>
        </RadioGroup>
      </div>

      <div className="pt-6 border-t border-gray-200 space-y-4">
        <div className="flex justify-between">
          <h3 className="text-md font-medium">Custom Leverage</h3>
          <Badge variant={leverage > 5 ? "destructive" : leverage > 2 ? "outline" : "secondary"}>
            {leverage}x
          </Badge>
        </div>

        <div className="space-y-3">
          <Slider 
            value={[leverage]} 
            min={1} 
            max={10} 
            step={0.5} 
            onValueChange={handleSliderChange}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1x (No Leverage)</span>
            <span>5x</span>
            <span>10x (Max)</span>
          </div>
        </div>

        <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-4">
          <div className="flex">
            <DollarSign className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800">Margin Requirement</h4>
              <p className="text-sm text-amber-700 mt-1">
                Trading with {leverage}x leverage requires a minimum margin of {Math.round(100/leverage)}% of the position value.
                Higher leverage increases the risk of liquidation if the market moves against your position.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingValiditySelection;
