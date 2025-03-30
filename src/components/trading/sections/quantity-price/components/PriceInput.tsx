
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Instrument } from "../../../types";

interface PriceInputProps {
  price: number | "";
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  orderExecutionType: string;
  selectedInstrument: Instrument;
}

const PriceInput: React.FC<PriceInputProps> = ({
  price,
  onPriceChange,
  orderExecutionType,
  selectedInstrument
}) => {
  return (
    <div>
      <Label htmlFor="price" className="text-base">
        {orderExecutionType === "limit" ? "Limit Price" : orderExecutionType === "stop" ? "Stop Price" : "Price per Share"}
      </Label>
      <Input
        id="price"
        type="number"
        min="0.01"
        step="0.01"
        value={price}
        onChange={onPriceChange}
        placeholder="Enter price"
        className="mt-1"
      />
      <p className="text-sm text-gray-500 mt-1">
        Current market price: {selectedInstrument.currentPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: selectedInstrument.currency
        })}
      </p>
    </div>
  );
};

export default PriceInput;
