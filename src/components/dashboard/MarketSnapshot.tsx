
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MarketSnapshot = () => {
  const markets = [
    { name: "S&P 500", value: "5,328.42", change: "+0.83%", isPositive: true },
    { name: "NASDAQ", value: "16,742.39", change: "+1.24%", isPositive: true },
    { name: "DOW JONES", value: "39,069.59", change: "-0.21%", isPositive: false },
    { name: "FTSE 100", value: "7,930.96", change: "+0.37%", isPositive: true },
    { name: "NIKKEI 225", value: "39,523.55", change: "+1.05%", isPositive: true },
    { name: "DAX", value: "18,236.19", change: "+0.42%", isPositive: true },
    { name: "HANG SENG", value: "16,512.42", change: "-0.95%", isPositive: false },
    { name: "CRUDE OIL", value: "$82.35", change: "+1.34%", isPositive: true },
    { name: "GOLD", value: "$2,345.70", change: "+0.68%", isPositive: true },
    { name: "BITCOIN", value: "$68,432.21", change: "+2.45%", isPositive: true },
    { name: "EUR/USD", value: "1.0892", change: "-0.14%", isPositive: false },
    { name: "USD/JPY", value: "151.23", change: "+0.25%", isPositive: true },
    { name: "GBP/USD", value: "1.2756", change: "+0.18%", isPositive: true },
    { name: "USD/CHF", value: "0.8954", change: "-0.32%", isPositive: false },
    { name: "10Y US TREASURY", value: "4.25%", change: "+0.06", isPositive: true },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Market Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-12 max-h-[300px] overflow-y-auto">
            {markets.map((market, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <p className="text-sm font-medium">{market.name}</p>
                <p className="text-base font-semibold mt-1">{market.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs flex items-center ${market.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {market.isPositive ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                    {market.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-white pb-5 pt-2">
            <Link to="/market-data">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                View All Market Data
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
