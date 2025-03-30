
import React from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, AlertTriangle, Info } from "lucide-react";

interface TradingLeverageOptionsProps {
  leverage: number;
  setLeverage: (value: number) => void;
  orderType: string;
}

const TradingLeverageOptions: React.FC<TradingLeverageOptionsProps> = ({
  leverage,
  setLeverage,
  orderType
}) => {
  // Define preset leverage options
  const leverageOptions = [
    { 
      value: 1, 
      title: "No Leverage (1x)", 
      icon: Shield, 
      iconColor: "text-green-600", 
      description: "Standard trading with your available capital.", 
      badge: "Conservative" 
    },
    { 
      value: 2, 
      title: "Moderate (2x)", 
      icon: TrendingUp, 
      iconColor: "text-blue-600", 
      description: "Double your buying power with moderate risk.", 
      badge: "Standard" 
    },
    { 
      value: 5, 
      title: "Advanced (5x)", 
      icon: AlertTriangle, 
      iconColor: "text-amber-600", 
      description: "Quintuple your position size with higher risk.", 
      badge: "High Risk" 
    }
  ];

  // Function to handle card selection
  const handleCardSelection = (value: number) => {
    setLeverage(value);
  };

  // Function to handle slider change
  const handleSliderChange = (values: number[]) => {
    if (values.length > 0) {
      setLeverage(values[0]);
    }
  };

  // Function to get badge variant based on leverage value
  const getBadgeVariant = (value: number) => {
    if (value <= 1) return "secondary";
    if (value <= 3) return "outline";
    return "destructive";
  };

  return (
    <div className="space-y-8">
      {/* Explanation text */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {orderType === "buy" 
            ? "Apply leverage to increase your buying power and potential returns." 
            : "Apply leverage for short positions to increase potential returns."}
          <span className="text-amber-600 font-medium"> Higher leverage increases both potential returns and risks.</span>
        </p>
      </div>

      {/* Leverage option cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leverageOptions.map((option) => (
          <Card 
            key={option.value}
            onClick={() => handleCardSelection(option.value)}
            className={`p-4 cursor-pointer transition-all ${
              leverage === option.value 
                ? 'ring-2 ring-black' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center text-center">
              <option.icon className={`h-5 w-5 ${option.iconColor} mb-2`} />
              <h3 className="font-medium mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {option.description}
              </p>
              <Badge 
                variant={(leverage === option.value ? "default" : getBadgeVariant(option.value)) as any}
              >
                {option.badge}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Custom leverage slider */}
      <div className="pt-8 border-t border-gray-200 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-medium">Custom Leverage</h3>
          <Badge variant={getBadgeVariant(leverage) as any}>
            {leverage}x
          </Badge>
        </div>

        <div className="space-y-4">
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

        {/* Risk information */}
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
          <div className="flex">
            <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
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

export default TradingLeverageOptions;
