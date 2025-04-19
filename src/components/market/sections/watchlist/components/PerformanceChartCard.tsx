
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Performance chart card for watchlist items
 * Currently shows a placeholder for selected items
 * 
 * @returns Performance chart card component
 */
const PerformanceChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">Select an asset to view performance chart</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChartCard;
