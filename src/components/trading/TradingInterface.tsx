
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TradingForm from "./TradingForm";
import { OrderType } from "./types";
import MarketInsights from "./sections/MarketInsights";

const TradingInterface = () => {
  const [orderType, setOrderType] = useState<OrderType>("buy");

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Trading</h1>
        <p className="text-muted-foreground">
          Execute trades across your portfolios with institutional-grade tools
        </p>
      </div>

      <Card className="overflow-hidden">
        <Tabs 
          defaultValue="buy" 
          onValueChange={(value) => setOrderType(value as OrderType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy" className="data-[state=active]:bg-green-50">Buy Order</TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-red-50">Sell Order</TabsTrigger>
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

      <MarketInsights />
    </div>
  );
};

export default TradingInterface;
