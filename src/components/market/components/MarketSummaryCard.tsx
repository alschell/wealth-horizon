
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
  name: string;
  value: string;
  change: number;
  color: string;
}

interface MarketSummaryCardProps {
  title: string;
  subtitle: string;
  data: MarketData[];
}

export const MarketSummaryCard: React.FC<MarketSummaryCardProps> = ({ 
  title, 
  subtitle, 
  data 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <span className="font-medium text-sm">{item.name}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono">{item.value}</span>
                <div className={`flex items-center ${
                  item.change >= 0 ? "text-gray-700" : "text-gray-500"
                }`}>
                  {item.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span className="text-xs font-semibold">
                    {item.change >= 0 ? "+" : ""}{item.change}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
