
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const WealthAnalysisHeader = () => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <BarChart className="h-8 w-8 text-blue-700" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Analyze Wealth</h1>
            <p className="text-muted-foreground max-w-3xl">
              Review asset allocations, analyze performance metrics, and assess risk factors across your portfolio.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WealthAnalysisHeader;
