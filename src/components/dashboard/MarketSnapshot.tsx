
import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketSnapshot = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Market Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">S&P 500</span>
            <div className="flex items-center">
              <span className="mr-2">4,587.20</span>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="text-xs">+0.85%</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">NASDAQ</span>
            <div className="flex items-center">
              <span className="mr-2">14,346.30</span>
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="text-xs">+1.2%</span>
              </div>
            </div>
          </div>
          
          <Link to="/market-data" className="block mt-3">
            <Button variant="outline" size="sm" className="w-full">
              View Full Market Data
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketSnapshot;
