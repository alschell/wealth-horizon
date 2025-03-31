
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, AlertTriangle, Clock, Calendar, User, Briefcase, Building, ArrowRight } from "lucide-react";
import { OrderType, TradeOrder } from "../types";
import { mockInstruments, mockBrokers } from "../data";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TradingReviewProps {
  order: Partial<TradeOrder>;
  orderType: OrderType;
  selectedInstrument: any;
  [key: string]: any;
}

const TradingReview: React.FC<TradingReviewProps> = ({
  order,
  orderType,
  selectedInstrument
}) => {
  const instrument = selectedInstrument || 
    (order.instrumentId ? mockInstruments.find(i => i.id === order.instrumentId) : null);

  const broker = order.brokerId === "best" 
    ? { id: "best", name: "Best Execution" }
    : mockBrokers.find(b => b.id === order.brokerId) || { id: "unknown", name: "Unknown" };

  const executionTypeDisplay = {
    "market": "Market",
    "limit": "Limit",
    "stop": "Stop"
  }[order.executionType as string] || "Market";

  const timeInForceDisplay = {
    "day": "Day Only",
    "gtc": "Good Till Canceled (GTC)",
    "fok": "Fill or Kill (FOK)",
    "ioc": "Immediate or Cancel (IOC)"
  }[order.timeInForce as string] || "Day Only";

  const totalAmount = (order.quantity || 0) * (
    order.executionType === "market" 
      ? (instrument?.currentPrice || 0) 
      : (order.price || 0)
  );

  const estimatedFees = totalAmount * 0.0025; // Example: 0.25% commission
  const totalWithFees = totalAmount + estimatedFees;

  // Check for potential warnings
  const warnings = [];
  
  if (orderType === "buy" && totalAmount > 100000) {
    warnings.push("Large order - consider splitting into multiple transactions");
  }
  
  if (order.executionType === "market" && orderType === "sell") {
    warnings.push("Market sell orders may execute at prices lower than current market value");
  }

  return (
    <div className="space-y-6">
      {/* Removed Review Your Order heading and description */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              ) : (
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
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warnings and notices */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-800 mb-1">Please note:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-amber-700">{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation box */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-2">
        <div className="flex items-start">
          <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-800">Ready to submit</h4>
            <p className="text-sm text-green-700 mt-1">
              By clicking "Submit Order", you agree to the terms and conditions of this transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingReview;
