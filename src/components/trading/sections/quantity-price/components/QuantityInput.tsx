
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface QuantityInputProps {
  quantity: number | "";
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  quantityPercent: number;
  onSliderChange: (value: number[]) => void;
  orderType: string;
  maxRecommendedQuantity: number;
  required?: boolean;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  onQuantityChange,
  quantityPercent,
  onSliderChange,
  orderType,
  maxRecommendedQuantity,
  required = false
}) => {
  return (
    <div>
      <Label htmlFor="quantity" className="text-base">
        Quantity
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id="quantity"
        type="number"
        min="1"
        step="1"
        value={quantity}
        onChange={onQuantityChange}
        placeholder="Enter quantity"
        className="mt-1"
        required={required}
      />
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>0</span>
          <span>{maxRecommendedQuantity}</span>
        </div>
        <Slider
          value={[quantityPercent]}
          min={0}
          max={100}
          step={1}
          onValueChange={onSliderChange}
          className="mt-1"
        />
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Number of shares to {orderType}
      </p>
    </div>
  );
};

export default QuantityInput;
