
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketIndex {
  name: string;
  value: string;
  change: number;
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
}

const MarketData = () => {
  // Mock data - in a real app, this would come from your API
  const indices: MarketIndex[] = [
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
      name: "FTSE 100",
      value: "7,582.10",
      change: -0.32,
    },
  ];

  const news: NewsItem[] = [
    {
      id: "1",
      title: "Fed signals potential rate cuts later this year",
      source: "Financial Times",
      time: "2h ago",
    },
    {
      id: "2",
      title: "Tech stocks rally on positive earnings outlook",
      source: "Wall Street Journal",
      time: "4h ago",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Market Data & News</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {indices.map((index, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="font-medium text-sm">{index.name}</span>
              <div className="flex items-center">
                <span className="mr-2">{index.value}</span>
                <div className={`flex items-center ${
                  index.change >= 0 ? "text-green-500" : "text-red-500"
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
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Latest News</h4>
          <div className="space-y-2">
            {news.map((item) => (
              <div key={item.id} className="cursor-pointer hover:bg-gray-50 rounded-md p-2 transition-colors">
                <p className="text-sm font-medium">{item.title}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{item.source}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketData;
