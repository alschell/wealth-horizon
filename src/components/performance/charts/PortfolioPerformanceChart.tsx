
import React from "react";
import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortfolioPerformanceChart = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <h3 className="text-sm font-medium mb-2 flex items-center">
        <LineChart className="h-4 w-4 mr-1 text-gray-500" /> Portfolio Performance
      </h3>
      <p className="text-xs text-gray-500 mb-4">Compared to benchmarks</p>
      <div className="h-36 flex items-center justify-center bg-gray-100 rounded">
        <p className="text-sm text-gray-500">Detailed chart view available in the Analysis section</p>
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm" className="w-full">
          View Full Analysis
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPerformanceChart;
