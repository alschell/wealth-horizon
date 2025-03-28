
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instrument, OrderType } from "../types";
import { Card } from "@/components/ui/card";
import { AlertCircle, Info } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface TradingQuantityPriceProps {
  orderType: OrderType;
  selectedInstrument: Instrument | null;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  orderExecutionType: string;
  [key: string]: any;
}

const TradingQuantityPrice: React.FC<TradingQuantityPriceProps> = ({
  orderType,
  selectedInstrument,
  quantity,
  setQuantity,
  price,
  setPrice,
  orderExecutionType
}) => {
  const [total, setTotal] = useState<number>(0);
  const [quantityPercent, setQuantityPercent] = useState<number>(50);
  // Update the maximum quantity to 100,000
  const maxRecommendedQuantity = 100000;

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

  useEffect(() => {
    // Set default price to current price when instrument is selected
    if (selectedInstrument && price === "" && orderExecutionType !== "market") {
      setPrice(selectedInstrument.currentPrice);
    }
  }, [selectedInstrument, price, setPrice, orderExecutionType]);

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

  const handleQuantitySliderChange = (value: number[]) => {
    const percent = value[0];
    setQuantityPercent(percent);
    const newQuantity = Math.round((percent / 100) * maxRecommendedQuantity);
    setQuantity(newQuantity === 0 ? "" : newQuantity);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value === "" ? "" : Number(value));
  };

  const showPriceInput = orderExecutionType !== "market";

  return (
    <div className="space-y-6">
      {orderExecutionType === "market" && (
        <div className="bg-yellow-50 p-4 rounded-md border border-yellow-100 mb-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-sm text-yellow-700">
              Market orders execute immediately at the best available price. The final price may differ from the current market price shown.
            </p>
          </div>
        </div>
      )}

      {selectedInstrument ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="quantity" className="text-base">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  placeholder="Enter quantity"
                  className="mt-1"
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
                    onValueChange={handleQuantitySliderChange}
                    className="mt-1"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Number of shares to {orderType}
                </p>
              </div>

              {showPriceInput && (
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
                    onChange={handlePriceChange}
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
              )}
            </div>

            <Card className="bg-gray-50 p-5 rounded-md border space-y-4">
              <h3 className="font-semibold border-b pb-2">Order Summary</h3>
              
              <div>
                <p className="text-sm text-gray-500">Instrument</p>
                <p className="font-medium">{selectedInstrument.symbol} - {selectedInstrument.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Order Type</p>
                <p className="font-medium capitalize">
                  {orderType} ({orderExecutionType})
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{quantity || "—"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">
                  {orderExecutionType === "market" ? "Estimated Price" : 
                   orderExecutionType === "limit" ? "Limit Price" : 
                   orderExecutionType === "stop" ? "Stop Price" : "Price"}
                </p>
                <p className="font-medium">
                  {orderExecutionType === "market" 
                    ? selectedInstrument.currentPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: selectedInstrument.currency
                      })
                    : typeof price === 'number' 
                      ? price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: selectedInstrument.currency
                        }) 
                      : "—"
                  }
                </p>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-gray-500">
                  {orderExecutionType === "market" ? "Estimated Total" : "Total Amount"}
                </p>
                <p className="font-bold text-lg">
                  {total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: selectedInstrument?.currency || 'USD'
                  })}
                </p>
                {orderExecutionType === "market" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Final amount may vary based on market conditions
                  </p>
                )}
              </div>
            </Card>
          </div>
        </>
      ) : (
        <div className="text-center p-6 border rounded-md">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="font-medium">Please select an instrument first</p>
          <p className="text-sm text-gray-500 mt-1">
            Return to the previous step to select a security
          </p>
        </div>
      )}
    </div>
  );
};

export default TradingQuantityPrice;
