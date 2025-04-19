
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

export const CommoditiesCard = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle>Commodities</CardTitle>
          <Button variant="ghost" className="text-xs flex items-center gap-1 text-gray-500">
            View All <ArrowUpRight size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-2">
          {[
            { name: "Gold", price: "$2,356.70", change: 0.75, color: "#777777" },
            { name: "Silver", price: "$28.12", change: 1.15, color: "#999999" },
            { name: "Crude Oil", price: "$75.46", change: -0.65, color: "#333333" },
            { name: "Natural Gas", price: "$3.12", change: 2.15, color: "#555555" },
          ].map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm">{item.price}</span>
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
