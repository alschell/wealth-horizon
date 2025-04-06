import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const MarketSnapshot = () => {
  // Mock market data
  const marketData = [
    { country: "USA", index: "DJIA", value: 34000, change: "+1.2%" },
    { country: "Germany", index: "DAX", value: 15500, change: "-0.5%" },
    { country: "Japan", index: "Nikkei", value: 28500, change: "+0.8%" },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Market Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 relative">
        <div className="space-y-3 pb-12">
          {marketData.map((item) => (
            <div className="flex items-center justify-between" key={item.country}>
              <div className="flex items-center gap-2">
                <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                  <span className="text-xs">{item.country}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{item.index}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">{item.value}</p>
                <p className="text-xs text-gray-500">{item.change}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-white pb-5 pt-2">
          <div className="flex justify-center">
            <Link to="/market-data">
              <Button variant="outline" size="sm" className="flex items-center justify-center px-6">
                View All Market Data & News
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
