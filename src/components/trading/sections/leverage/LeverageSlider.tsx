
import React, { useCallback, memo } from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface LeverageSliderProps {
  leverage: number;
  setLeverage: (value: number) => void;
}

const LeverageSlider: React.FC<LeverageSliderProps> = ({
  leverage,
  setLeverage
}) => {
  // Get badge variant based on leverage value
  const getBadgeVariant = (value: number): "default" | "secondary" | "outline" | "destructive" => {
    if (value <= 1) return "secondary";
    if (value <= 3) return "outline";
    return "destructive";
  };

  // Handle slider change with memoization to prevent recreation on every render
  const handleSliderChange = useCallback((values: number[]) => {
    if (values && values.length > 0) {
      setLeverage(values[0]);
    }
  }, [setLeverage]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-medium">Custom Leverage</h3>
        <Badge 
          variant={getBadgeVariant(leverage)}
          className={leverage > 3 ? "bg-red-500 text-white" : ""}
        >
          {leverage}x
        </Badge>
      </div>

      <div className="space-y-6">
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
    </div>
  );
};

export default memo(LeverageSlider);
