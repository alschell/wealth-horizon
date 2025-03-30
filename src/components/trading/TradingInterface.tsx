
import React from "react";
import TradingForm from "./TradingForm";
import MarketInsights from "./sections/MarketInsights";

const TradingInterface = () => {
  return (
    <div className="space-y-8">
      <TradingForm />
      <MarketInsights />
    </div>
  );
};

export default TradingInterface;
