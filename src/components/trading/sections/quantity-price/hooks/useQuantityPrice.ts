
import { useState, useEffect } from "react";
import { Instrument } from "../../../types";

interface UseQuantityPriceProps {
  selectedInstrument: Instrument | null;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  orderExecutionType: string;
}

export const useQuantityPrice = ({
  selectedInstrument,
  quantity,
  setQuantity,
  price,
  setPrice,
  orderExecutionType
}: UseQuantityPriceProps) => {
  const [total, setTotal] = useState<number>(0);
  const [quantityPercent, setQuantityPercent] = useState<number>(50);
  
  // Maximum quantity constant
  const maxRecommendedQuantity = 100000;

  // Calculate total whenever quantity, price, or instrument changes
  useEffect(() => {
    if (selectedInstrument) {
      const calculatedPrice = orderExecutionType === "market"
        ? selectedInstrument.currentPrice
        : (typeof price === 'number' ? price : selectedInstrument.currentPrice);
        
      if (typeof quantity === 'number') {
        setTotal(quantity * calculatedPrice);
      } else {
        setTotal(0);
      }
    } else {
      setTotal(0);
    }
  }, [quantity, price, selectedInstrument, orderExecutionType]);

  // Set default price when instrument is selected
  useEffect(() => {
    if (selectedInstrument && price === "" && orderExecutionType !== "market") {
      setPrice(selectedInstrument.currentPrice);
    }
  }, [selectedInstrument, price, setPrice, orderExecutionType]);

  // Handle quantity input changes
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = value === "" ? "" : Number(value);
    setQuantity(numValue);
    
    if (typeof numValue === 'number' && numValue > 0) {
      const percent = Math.min(Math.round((numValue / maxRecommendedQuantity) * 100), 100);
      setQuantityPercent(percent);
    } else {
      setQuantityPercent(0);
    }
  };

  // Handle slider value changes for quantity
  const handleQuantitySliderChange = (value: number[]) => {
    const percent = value[0];
    setQuantityPercent(percent);
    const newQuantity = Math.round((percent / 100) * maxRecommendedQuantity);
    setQuantity(newQuantity === 0 ? "" : newQuantity);
  };

  // Handle price input changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value === "" ? "" : Number(value));
  };

  return {
    total,
    quantityPercent,
    maxRecommendedQuantity,
    handleQuantityChange,
    handleQuantitySliderChange,
    handlePriceChange
  };
};
