
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderType, TradeOrder } from "../../types";

interface OrderDetailsCardProps {
  order: Partial<TradeOrder>;
  orderType: OrderType;
  instrument: any;
  executionTypeDisplay: string;
  totalAmount: number;
  estimatedFees: number;
  totalWithFees: number;
}

const OrderDetailsCard: React.FC<OrderDetailsCardProps> = ({
  order,
  orderType,
  instrument,
  executionTypeDisplay,
  totalAmount,
  estimatedFees,
  totalWithFees
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-gray-600" />
          Order Details
        </h4>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Type</span>
            <span className="font-medium capitalize">
              {orderType} ({executionTypeDisplay})
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Instrument</span>
            <span className="font-medium">
              {instrument?.symbol} - {instrument?.name}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Quantity</span>
            <span className="font-medium">{order.quantity}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">
              {order.executionType === "market" ? "Estimated Price" : 
               order.executionType === "limit" ? "Limit Price" : 
               order.executionType === "stop" ? "Stop Price" : "Price"}
            </span>
            <span className="font-medium">
              {order.executionType === "market" 
                ? instrument?.currentPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: instrument?.currency
                  })
                : order.price?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: instrument?.currency
                  })
              }
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">
              {totalAmount.toLocaleString('en-US', {
                style: 'currency',
                currency: instrument?.currency || 'USD'
              })}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Fees</span>
            <span className="font-medium">
              {estimatedFees.toLocaleString('en-US', {
                style: 'currency',
                currency: instrument?.currency || 'USD'
              })}
            </span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              {totalWithFees.toLocaleString('en-US', {
                style: 'currency',
                currency: instrument?.currency || 'USD'
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsCard;
