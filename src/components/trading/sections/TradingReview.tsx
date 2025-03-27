import React from "react";
import { OrderType, TradeOrder } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import {
  mockBrokers,
  mockPortfoliosByInstitution,
  mockPortfoliosFlat,
  mockCashAccountsFlat,
  mockCreditFacilitiesFlat
} from "../data";

interface TradingReviewProps {
  orderType: OrderType;
  selectedInstrument: any;
  quantity: number | "";
  price: number | "";
  selectedBroker: string | "best";
  order: Partial<TradeOrder>;
  [key: string]: any;
}

const TradingReview: React.FC<TradingReviewProps> = ({
  orderType,
  selectedInstrument,
  quantity,
  price,
  selectedBroker,
  order
}) => {
  if (!selectedInstrument || !quantity || !price) {
    return (
      <div className="text-center p-4">
        Incomplete order information. Please go back and complete previous steps.
      </div>
    );
  }
  
  const totalAmount = Number(quantity) * Number(price);
  
  const getBrokerName = () => {
    if (selectedBroker === "best") return "Best Execution";
    const broker = mockBrokers.find(b => b.id === selectedBroker);
    return broker ? broker.name : "Unknown";
  };
  
  const getEntityNames = (institutionId: string, legalEntityId: string) => {
    const institution = mockPortfoliosByInstitution.find(
      inst => inst.id === institutionId
    );
    
    let legalEntity;
    for (const inst of mockPortfoliosByInstitution) {
      legalEntity = inst.legalEntities.find(
        entity => entity.id === legalEntityId
      );
      if (legalEntity) break;
    }
    
    return {
      institution: institution?.name || "Unknown",
      legalEntity: legalEntity?.name || "Unknown"
    };
  };
  
  const renderSourceAllocations = () => {
    if (orderType !== "sell" || !order.instrumentAllocations?.length) {
      return <p>No source portfolios selected</p>;
    }
    
    return (
      <div className="space-y-3">
        {order.instrumentAllocations.map((allocation, index) => {
          const portfolio = mockPortfoliosFlat.find(p => p.id === allocation.portfolioId);
          
          if (!portfolio) return null;
          
          const { institution, legalEntity } = getEntityNames(
            portfolio.institutionId,
            portfolio.legalEntityId
          );
          
          return (
            <div key={index} className="p-3 border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Portfolio</p>
                  <p className="font-medium">{portfolio.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-medium">{allocation.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Institution</p>
                  <p>{institution}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Legal Entity</p>
                  <p>{legalEntity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderFundingAllocations = () => {
    if (orderType !== "buy" || !order.fundingAllocations?.length) {
      return <p>No funding sources selected</p>;
    }
    
    return (
      <div className="space-y-3">
        {order.fundingAllocations.map((allocation, index) => {
          let source;
          let sourceType;
          
          if (allocation.sourceType === "cash") {
            source = mockCashAccountsFlat.find(acc => acc.id === allocation.sourceId);
            sourceType = "Cash Account";
          } else {
            source = mockCreditFacilitiesFlat.find(fac => fac.id === allocation.sourceId);
            sourceType = "Credit Facility";
          }
          
          if (!source) return null;
          
          const { institution, legalEntity } = getEntityNames(
            source.institutionId,
            source.legalEntityId
          );
          
          return (
            <div key={index} className="p-3 border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Source Type</p>
                  <p className="font-medium">{sourceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{source.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">
                    {allocation.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: allocation.currency
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Currency</p>
                  <p>{allocation.currency}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Institution</p>
                  <p>{institution}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Legal Entity</p>
                  <p>{legalEntity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  const renderDepositAllocations = () => {
    if (!order.depositAllocations?.length) {
      return <p>No destination allocations selected</p>;
    }
    
    return (
      <div className="space-y-3">
        {order.depositAllocations.map((allocation, index) => {
          let destination;
          let destinationType = allocation.destinationType;
          
          if (destinationType === "portfolio") {
            destination = mockPortfoliosFlat.find(p => p.id === allocation.destinationId);
          } else {
            destination = mockCashAccountsFlat.find(acc => acc.id === allocation.destinationId);
          }
          
          if (!destination) return null;
          
          const { institution, legalEntity } = getEntityNames(
            destination.institutionId,
            destination.legalEntityId
          );
          
          return (
            <div key={index} className="p-3 border rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">
                    {destinationType === "portfolio" ? "Portfolio" : "Cash Account"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{destination.name}</p>
                </div>
                
                {destinationType === "portfolio" && allocation.quantity && (
                  <div>
                    <p className="text-sm text-gray-500">Quantity</p>
                    <p className="font-medium">{allocation.quantity}</p>
                  </div>
                )}
                
                {destinationType === "cash" && allocation.amount && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">
                        {allocation.amount.toLocaleString('en-US', {
                          style: 'currency',
                          currency: allocation.currency || selectedInstrument.currency
                        })}
                      </p>
                    </div>
                    {allocation.currency && (
                      <div>
                        <p className="text-sm text-gray-500">Currency</p>
                        <p>{allocation.currency}</p>
                      </div>
                    )}
                  </>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Institution</p>
                  <p>{institution}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Legal Entity</p>
                  <p>{legalEntity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Order Summary</h3>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-sm text-gray-500">Order Type</p>
              <p className="font-medium capitalize">{orderType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Instrument</p>
              <p className="font-medium">{selectedInstrument.symbol} - {selectedInstrument.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Quantity</p>
              <p className="font-medium">{quantity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Price per Share</p>
              <p className="font-medium">
                {Number(price).toLocaleString('en-US', {
                  style: 'currency',
                  currency: selectedInstrument.currency
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="font-medium">
                {totalAmount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: selectedInstrument.currency
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Broker</p>
              <p className="font-medium">{getBrokerName()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {orderType === "sell" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Source Portfolios</h3>
            {renderSourceAllocations()}
          </CardContent>
        </Card>
      )}
      
      {orderType === "buy" && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Funding Sources</h3>
            {renderFundingAllocations()}
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {orderType === "buy" 
              ? "Destination Portfolios" 
              : "Destination Cash Accounts"}
          </h3>
          {renderDepositAllocations()}
        </CardContent>
      </Card>
      
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
        <p className="text-sm text-blue-700">
          Please review all details carefully before submitting your order. 
          Once submitted, your order will be processed according to the 
          broker&apos;s execution policies.
        </p>
      </div>
    </div>
  );
};

export default TradingReview;
