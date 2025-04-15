
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartDataPoint, IndexData } from "../types";
import { generateChartData } from "../utils/chartUtils";

interface IndexPerformanceChartProps {
  selectedIndex: IndexData | null;
  setSelectedIndex: (index: IndexData | null) => void;
  indices: IndexData[];
}

const IndexPerformanceChart: React.FC<IndexPerformanceChartProps> = ({
  selectedIndex,
  setSelectedIndex,
  indices
}) => {
  const chartData: ChartDataPoint[] = selectedIndex 
    ? generateChartData(selectedIndex.name, indices)
    : [];

  const isPositive = selectedIndex ? 
    // Convert to number if it's a string (from parseFloat)
    (typeof selectedIndex.change === 'string' ? 
      parseFloat(selectedIndex.change) >= 0 : 
      selectedIndex.isPositive) 
    : true;

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          {selectedIndex ? `${selectedIndex.name} Performance` : 'Index Performance'}
          {selectedIndex && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setSelectedIndex(null)}
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              View All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedIndex ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isPositive ? "#10B981" : "#EF4444"} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Select an index to view detailed performance chart</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IndexPerformanceChart;
