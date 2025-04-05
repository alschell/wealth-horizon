
import React from "react";
import { BarChartHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PerformanceOverview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Overview</CardTitle>
        <CardDescription>Quick snapshot of your wealth performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600 mb-1">Total Assets</p>
            <p className="text-2xl font-bold">$568K</p>
            <div className="flex items-center mt-1 text-green-600 text-xs">
              <BarChartHorizontal className="h-3 w-3 mr-1" /> +5.2% YTD
            </div>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <p className="text-sm text-amber-600 mb-1">Net Worth</p>
            <p className="text-2xl font-bold">$448K</p>
            <div className="flex items-center mt-1 text-green-600 text-xs">
              <BarChartHorizontal className="h-3 w-3 mr-1" /> +3.8% YTD
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600 mb-1">Cash Balance</p>
            <p className="text-2xl font-bold">$128K</p>
            <div className="flex items-center mt-1 text-blue-600 text-xs">
              <BarChartHorizontal className="h-3 w-3 mr-1" /> +1.2% YTD
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Investments</p>
            <p className="text-2xl font-bold">$340K</p>
            <div className="flex items-center mt-1 text-green-600 text-xs">
              <BarChartHorizontal className="h-3 w-3 mr-1" /> +8.5% YTD
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverview;
