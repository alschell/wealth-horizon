
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Clock, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { OrderType, TradeOrder } from "../../types";

interface ExecutionDetailsCardProps {
  order: Partial<TradeOrder>;
  orderType: OrderType;
  broker: { id: string; name: string };
  timeInForceDisplay: string;
}

const ExecutionDetailsCard: React.FC<ExecutionDetailsCardProps> = ({
  order,
  orderType,
  broker,
  timeInForceDisplay,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          <Building className="h-5 w-5 mr-2 text-gray-600" />
          Execution Details
        </h4>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Broker</span>
            <span className="font-medium">{broker.name}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Time in Force</span>
            <span className="font-medium">{timeInForceDisplay}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-500">Settlement Date</span>
            <span className="font-medium">T+2 (Estimated)</span>
          </div>
          
          <Separator />
          
          <h5 className="font-medium flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-600" />
            Allocation Details
          </h5>
          
          {orderType === "buy" ? (
            <BuyAllocationDetails order={order} />
          ) : (
            <SellAllocationDetails order={order} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const BuyAllocationDetails: React.FC<{ order: Partial<TradeOrder> }> = ({ order }) => {
  return (
    <>
      <div>
        <span className="text-gray-500 block mb-1">Funding Sources</span>
        <div className="bg-gray-50 p-2 rounded border text-sm">
          {order.fundingAllocations && order.fundingAllocations.length > 0 ? (
            order.fundingAllocations.map((source, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>{source.sourceType === "cash" ? "Cash Account" : "Credit Facility"}</span>
                <span className="font-medium">
                  {source.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: source.currency
                  })}
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-400">No funding sources specified</span>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Destination Portfolios</span>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>
        <div className="bg-gray-50 p-2 rounded border text-sm">
          {order.depositAllocations && order.depositAllocations.length > 0 ? (
            order.depositAllocations.map((dest, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>Portfolio</span>
                <span className="font-medium">{dest.quantity || 0} shares</span>
              </div>
            ))
          ) : (
            <span className="text-gray-400">No destinations specified</span>
          )}
        </div>
      </div>
    </>
  );
};

const SellAllocationDetails: React.FC<{ order: Partial<TradeOrder> }> = ({ order }) => {
  return (
    <>
      <div>
        <span className="text-gray-500 block mb-1">Source Portfolios</span>
        <div className="bg-gray-50 p-2 rounded border text-sm">
          {order.instrumentAllocations && order.instrumentAllocations.length > 0 ? (
            order.instrumentAllocations.map((source, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>Portfolio</span>
                <span className="font-medium">{source.quantity} shares</span>
              </div>
            ))
          ) : (
            <span className="text-gray-400">No source portfolios specified</span>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-gray-500">Destination Cash Accounts</span>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>
        <div className="bg-gray-50 p-2 rounded border text-sm">
          {order.depositAllocations && order.depositAllocations.length > 0 ? (
            order.depositAllocations.map((dest, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>Cash Account</span>
                <span className="font-medium">
                  {dest.amount?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: dest.currency || 'USD'
                  })}
                </span>
              </div>
            ))
          ) : (
            <span className="text-gray-400">No destinations specified</span>
          )}
        </div>
      </div>
    </>
  );
};

export default ExecutionDetailsCard;
