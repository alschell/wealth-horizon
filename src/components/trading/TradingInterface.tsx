
import React from "react";
import TradingForm from "./TradingForm";
import MarketInsights from "./sections/MarketInsights";

const TradingInterface = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Trading</h1>
        <p className="text-muted-foreground">
          Execute trades across your portfolios with institutional-grade tools
        </p>
      </div>

      <TradingForm />
      <MarketInsights />
    </div>
  );
};

export default TradingInterface;
