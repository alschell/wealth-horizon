
import React from "react";

interface TradingLayoutProps {
  children: React.ReactNode;
}

const TradingLayout: React.FC<TradingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-gray-50/30 to-white">
      {children}
    </div>
  );
};

export default TradingLayout;
