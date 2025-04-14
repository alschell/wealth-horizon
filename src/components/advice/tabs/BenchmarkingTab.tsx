
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "@/utils/icons";

const BenchmarkingTab: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-black" />
        Performance Benchmarking
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Mandate Performance Comparison</CardTitle>
          <CardDescription>Year-to-date performance across all mandates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-accent/20 rounded-md">
            <p className="text-muted-foreground">Performance comparison chart will be displayed here</p>
          </div>
          <div className="grid gap-4 grid-cols-2 mt-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Top Performing Mandate</h3>
              <p className="text-lg font-bold">UBS Wealth Management</p>
              <p className="text-sm text-gray-600">+10.3% YTD</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Industry Benchmark</h3>
              <p className="text-lg font-bold">S&P 500</p>
              <p className="text-sm text-gray-600">+7.2% YTD</p>
            </div>
          </div>
          <Button className="w-full mt-4">Generate Detailed Report</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BenchmarkingTab;
