
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TradeOrder } from "../types";
import { FundingSourcesSection } from "./allocation/buy/funding-sources";
import DestinationPortfoliosSection from "./allocation/buy/destination-portfolios/DestinationPortfoliosSection";
import SellAllocationSection from "./allocation/sell/SellAllocationSection";

interface TradingAllocationProps {
  orderType: string;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
  quantity: number | "";
  price: number | "";
  selectedInstrument: any;
  [key: string]: any;
}

const TradingAllocation: React.FC<TradingAllocationProps> = ({
  orderType,
  order,
  setOrder,
  quantity,
  price,
  selectedInstrument,
}) => {
  // Calculate total amount
  const totalAmount = 
    typeof quantity === 'number' && (typeof price === 'number' || selectedInstrument?.currentPrice)
      ? quantity * (typeof price === 'number' ? price : selectedInstrument?.currentPrice)
      : 0;
      
  const currency = selectedInstrument?.currency || "USD";
  const instrumentPrice = typeof price === 'number' ? price : selectedInstrument?.currentPrice || 0;

  if (orderType === "buy") {
    return (
      <div className="space-y-6">
        <Tabs defaultValue="funding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="funding">Funding Sources</TabsTrigger>
            <TabsTrigger value="destination">Destination Portfolios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="funding" className="pt-2">
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Funding Sources</h2>
              <p className="text-sm text-gray-600">
                Specify from which accounts to fund this purchase.
              </p>
            </div>
            
            <FundingSourcesSection
              totalAmount={totalAmount}
              currency={currency}
              instrumentPrice={instrumentPrice}
              order={order}
              setOrder={setOrder}
            />
          </TabsContent>
          
          <TabsContent value="destination" className="pt-2">
            <div className="mb-6">
              <h2 className="text-xl font-medium mb-2">Destination Portfolios</h2>
              <p className="text-sm text-gray-600">
                Select which portfolios to deposit the purchased shares into.
              </p>
            </div>
            
            <DestinationPortfoliosSection
              totalQuantity={typeof quantity === "number" ? quantity : 0}
              order={order}
              setOrder={setOrder}
              instrumentPrice={instrumentPrice}
              currency={currency}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return (
      <SellAllocationSection
        totalAmount={totalAmount}
        quantity={typeof quantity === "number" ? quantity : 0}
        currency={currency}
        selectedInstrument={selectedInstrument}
        order={order}
        setOrder={setOrder}
        price={instrumentPrice}
      />
    );
  }
};

export default TradingAllocation;
