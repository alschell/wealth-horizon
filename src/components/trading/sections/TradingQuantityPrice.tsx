
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instrument, OrderType } from "../types";

interface TradingQuantityPriceProps {
  orderType: OrderType;
  selectedInstrument: Instrument | null;
  quantity: number | "";
  setQuantity: (quantity: number | "") => void;
  price: number | "";
  setPrice: (price: number | "") => void;
  [key: string]: any;
}

const TradingQuantityPrice: React.FC<TradingQuantityPriceProps> = ({
  orderType,
  selectedInstrument,
  quantity,
  setQuantity,
  price,
  setPrice
}) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (typeof quantity === 'number' && typeof price === 'number') {
      setTotal(quantity * price);
    } else {
      setTotal(0);
    }
  }, [quantity, price]);

  useEffect(() => {
    // Set default price to current price when instrument is selected
    if (selectedInstrument && price === "") {
      setPrice(selectedInstrument.currentPrice);
    }
  }, [selectedInstrument, price, setPrice]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuantity(value === "" ? "" : Number(value));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value === "" ? "" : Number(value));
  };

  return (
    <div className="space-y-6">
      {selectedInstrument ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
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
                <p className="text-sm text-gray-500 mt-1">
                  Number of shares to {orderType}
                </p>
              </div>

              <div>
                <Label htmlFor="price">Price per Share</Label>
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
            </div>

            <div className="bg-gray-50 p-4 rounded-md border space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              
              <div>
                <p className="text-sm text-gray-500">Instrument</p>
                <p className="font-medium">{selectedInstrument.symbol} - {selectedInstrument.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Order Type</p>
                <p className="font-medium capitalize">{orderType}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{quantity || "—"}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Price per Share</p>
                <p className="font-medium">
                  {typeof price === 'number' ? price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: selectedInstrument.currency
                  }) : "—"}
                </p>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-bold text-lg">
                  {total.toLocaleString('en-US', {
                    style: 'currency',
                    currency: selectedInstrument.currency
                  })}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-4 border rounded-md">
          Please select an instrument first.
        </div>
      )}
    </div>
  );
};

export default TradingQuantityPrice;
