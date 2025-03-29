
import React from "react";
import TradingForm from "@/components/trading/TradingForm";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Trading Platform</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <TradingForm />
      </div>
    </div>
  );
};

export default Index;
