
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TradingForm from "./TradingForm";
import { OrderType } from "./types";
import { mockInstruments } from "./mockData";

const TradingInterface = () => {
  const [orderType, setOrderType] = useState<OrderType>("buy");

  // Get featured stocks for quick selection (using some well-known S&P 500 stocks)
  const featuredStocks = mockInstruments.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Trading</h1>
        <p className="text-muted-foreground">
          Buy and sell securities across your portfolios
        </p>
      </div>

      <Card className="overflow-hidden">
        <Tabs 
          defaultValue="buy" 
          onValueChange={(value) => setOrderType(value as OrderType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy Order</TabsTrigger>
            <TabsTrigger value="sell">Sell Order</TabsTrigger>
          </TabsList>
          <CardContent className="pt-6">
            <TabsContent value="buy" className="mt-0">
              <TradingForm orderType="buy" />
            </TabsContent>
            <TabsContent value="sell" className="mt-0">
              <TradingForm orderType="sell" />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-medium mb-4">Featured Stocks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredStocks.map((stock) => (
            <Card key={stock.id} className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-4">
                <div className="font-bold">{stock.symbol}</div>
                <div className="text-sm text-gray-500 truncate" title={stock.name}>
                  {stock.name}
                </div>
                <div className="mt-2 font-medium">
                  {stock.currentPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: stock.currency
                  })}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {stock.exchange}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;
