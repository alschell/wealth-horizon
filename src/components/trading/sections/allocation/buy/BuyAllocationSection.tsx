
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TradeOrder } from "@/components/trading/types";
import FundingSourcesSection from "./funding-sources/FundingSourcesSection";
import DestinationPortfoliosSection from "./destination-portfolios/DestinationPortfoliosSection";

interface BuyAllocationSectionProps {
  totalAmount: number;
  quantity: number;
  currency: string;
  selectedInstrument: any;
  price: number;
  order: Partial<TradeOrder>;
  setOrder: (order: Partial<TradeOrder>) => void;
}

const BuyAllocationSection: React.FC<BuyAllocationSectionProps> = ({
  totalAmount,
  quantity,
  currency,
  selectedInstrument,
  price,
  order,
  setOrder
}) => {
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
            instrumentPrice={price}
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
            totalQuantity={quantity}
            order={order}
            setOrder={setOrder}
            instrumentPrice={price}
            currency={currency}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuyAllocationSection;
