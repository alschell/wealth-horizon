
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MarketSnapshot = () => {
  // Define market indices for the snapshot view - expanded to top 10
  const indices = [
    {
      name: "S&P 500",
      value: "4,587.20",
      change: 0.85,
    },
    {
      name: "NASDAQ",
      value: "14,346.30",
      change: 1.2,
    },
    {
      name: "Dow Jones",
      value: "32,627.80",
      change: 0.45,
    },
    {
      name: "FTSE 100",
      value: "6,952.30",
      change: -0.22,
    },
    {
      name: "DAX",
      value: "14,688.40",
      change: 0.31,
    },
    {
      name: "Nikkei 225",
      value: "29,176.70",
      change: 1.34,
    },
    {
      name: "Shanghai Comp",
      value: "3,442.61",
      change: -0.92,
    },
    {
      name: "Hang Seng",
      value: "28,750.83",
      change: -1.28,
    },
    {
      name: "ASX 200",
      value: "6,821.20",
      change: 0.27,
    },
    {
      name: "CAC 40",
      value: "5,997.96",
      change: 0.42,
    },
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md">Market Snapshot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {indices.map((index, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="font-medium text-sm">{index.name}</span>
              <div className="flex items-center">
                <span className="mr-2">{index.value}</span>
                <div className={`flex items-center ${
                  index.change >= 0 ? "text-emerald-600" : "text-red-500"
                }`}>
                  {index.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span className="text-xs">
                    {index.change >= 0 ? "+" : ""}
                    {index.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
          <Link to="/market-data" className="block mt-4">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              View All Market Data & News
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
