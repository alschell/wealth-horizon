
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart } from "lucide-react";

const MarketDataHeader = () => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <LineChart className="h-8 w-8 text-purple-700" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">View Market Data & News</h1>
            <p className="text-muted-foreground max-w-3xl">
              Track market indices, view financial news, and monitor watchlists to stay informed on market movements.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketDataHeader;
