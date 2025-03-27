
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import TradingForm from "./TradingForm";
import { OrderType } from "./types";

const TradingInterface = () => {
  const [orderType, setOrderType] = useState<OrderType>("buy");

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
    </div>
  );
};

export default TradingInterface;
