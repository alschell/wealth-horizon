
import React from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

interface TradingLeverageOptionsProps {
  leverage: number;
  setLeverage: (value: number) => void;
  orderType: string;
  [key: string]: any;
}

const TradingLeverageOptions: React.FC<TradingLeverageOptionsProps> = ({
  leverage,
  setLeverage,
  orderType
}) => {
  // Handle slider change safely
  const handleSliderChange = (values: number[]) => {
    if (values && values.length > 0) {
      setLeverage(values[0]);
    }
  };

  // Fixed the event handling to prevent browser freezing
  const handleLeverageSelect = (value: number) => {
    setLeverage(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          {orderType === "buy" 
            ? "Apply leverage to increase your buying power and potential returns." 
            : "Apply leverage for short positions to increase potential returns."}
          <span className="text-amber-600 font-medium"> Higher leverage increases both potential returns and risks.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <LeverageCard 
            value={1}
            currentLeverage={leverage}
            title="No Leverage (1x)"
            description="Standard trading with your available capital."
            badgeText="Conservative"
            badgeVariant="secondary"
            icon={<Shield className="h-5 w-5 text-green-600 mb-2" />}
            onSelect={handleLeverageSelect}
          />

          <LeverageCard 
            value={2}
            currentLeverage={leverage}
            title="Moderate (2x)"
            description="Double your buying power with moderate risk."
            badgeText="Standard"
            badgeVariant="outline"
            icon={<TrendingUp className="h-5 w-5 text-blue-600 mb-2" />}
            onSelect={handleLeverageSelect}
          />

          <LeverageCard 
            value={5}
            currentLeverage={leverage}
            title="Advanced (5x)"
            description="Quintuple your position size with higher risk."
            badgeText="High Risk"
            badgeVariant="destructive"
            icon={<AlertTriangle className="h-5 w-5 text-amber-600 mb-2" />}
            onSelect={handleLeverageSelect}
          />
        </div>
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

// Extract leverage card to a separate component to improve render performance
interface LeverageCardProps {
  value: number;
  currentLeverage: number;
  title: string;
  description: string;
  badgeText: string;
  badgeVariant: "secondary" | "outline" | "destructive";
  icon: React.ReactNode;
  onSelect: (value: number) => void;
}

const LeverageCard: React.FC<LeverageCardProps> = ({
  value,
  currentLeverage,
  title,
  description,
  badgeText,
  badgeVariant,
  icon,
  onSelect
}) => {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all ${currentLeverage === value ? 'ring-2 ring-black' : 'hover:bg-gray-50'}`}
      onClick={() => onSelect(value)}
    >
      <div className="flex flex-col items-center">
        {icon}
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-gray-600 text-center">
          {description}
        </p>
        <Badge variant={badgeVariant} className="mt-2">{badgeText}</Badge>
      </div>
    </Card>
  );
};

export default TradingLeverageOptions;
