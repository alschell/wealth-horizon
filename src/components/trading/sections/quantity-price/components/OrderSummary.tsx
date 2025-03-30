
import React from "react";
import { Card } from "@/components/ui/card";
import { Instrument } from "../../../types";

interface OrderSummaryProps {
  selectedInstrument: Instrument;
  orderType: string;
  orderExecutionType: string;
  quantity: number | "";
  price: number | "";
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedInstrument,
  orderType,
  orderExecutionType,
  quantity,
  price,
  total
}) => {
  return (
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
  );
};

export default OrderSummary;
