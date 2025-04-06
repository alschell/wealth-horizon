
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Flag icons for currencies and markets
const getFlagIcon = (code: string) => {
  const flagMap: Record<string, string> = {
    // United States
    "US": "🇺🇸",
    // European Union
    "EU": "🇪🇺",
    // United Kingdom
    "UK": "🇬🇧",
    // Japan
    "JP": "🇯🇵",
    // China
    "CN": "🇨🇳",
    // Germany
    "DE": "🇩🇪",
    // Switzerland
    "CH": "🇨🇭",
    // Australia
    "AU": "🇦🇺",
    // Canada
    "CA": "🇨🇦",
    // Hong Kong
    "HK": "🇭🇰",
    // Singapore
    "SG": "🇸🇬",
    // Default for cryptocurrency/commodities
    "CRYPTO": "💰",
    "GOLD": "🏆",
    "OIL": "🛢️",
  };

  return flagMap[code] || "🌐";
};

const MarketSnapshot = () => {
  const markets = [
    { name: "S&P 500", value: "5,328.42", change: "+0.83%", isPositive: true, flag: "US" },
    { name: "NASDAQ", value: "16,742.39", change: "+1.24%", isPositive: true, flag: "US" },
    { name: "DOW JONES", value: "39,069.59", change: "-0.21%", isPositive: false, flag: "US" },
    { name: "FTSE 100", value: "7,930.96", change: "+0.37%", isPositive: true, flag: "UK" },
    { name: "NIKKEI 225", value: "39,523.55", change: "+1.05%", isPositive: true, flag: "JP" },
    { name: "DAX", value: "18,236.19", change: "+0.42%", isPositive: true, flag: "DE" },
    { name: "HANG SENG", value: "16,512.42", change: "-0.95%", isPositive: false, flag: "HK" },
    { name: "ASX 200", value: "7,784.50", change: "+0.62%", isPositive: true, flag: "AU" },
    { name: "TSX", value: "21,970.11", change: "+0.45%", isPositive: true, flag: "CA" },
    { name: "SSE", value: "3,045.28", change: "-0.33%", isPositive: false, flag: "CN" },
    { name: "STI", value: "3,212.76", change: "+0.27%", isPositive: true, flag: "SG" },
    { name: "CRUDE OIL", value: "$82.35", change: "+1.34%", isPositive: true, flag: "OIL" },
    { name: "GOLD", value: "$2,345.70", change: "+0.68%", isPositive: true, flag: "GOLD" },
    { name: "BITCOIN", value: "$68,432.21", change: "+2.45%", isPositive: true, flag: "CRYPTO" },
    { name: "EUR/USD", value: "1.0892", change: "-0.14%", isPositive: false, flag: "EU" },
    { name: "USD/JPY", value: "151.23", change: "+0.25%", isPositive: true, flag: "JP" },
    { name: "GBP/USD", value: "1.2756", change: "+0.18%", isPositive: true, flag: "UK" },
    { name: "USD/CHF", value: "0.8954", change: "-0.32%", isPositive: false, flag: "CH" },
    { name: "10Y US TREASURY", value: "4.25%", change: "+0.06", isPositive: true, flag: "US" },
  ];

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Market Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="relative flex-1 flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pb-12 overflow-y-auto flex-1">
            {markets.map((market, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{getFlagIcon(market.flag)}</span>
                  <p className="text-sm font-medium">{market.name}</p>
                </div>
                <p className="text-base font-semibold ml-7 mt-1">{market.value}</p>
                <div className="flex items-center mt-1 ml-7">
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
