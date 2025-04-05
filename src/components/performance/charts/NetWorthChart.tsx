
import React, { useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

type NetWorthChartProps = {
  performanceData: {
    month: string;
    value: number;
  }[];
  chartConfig: any;
};

const NetWorthChart = ({ performanceData, chartConfig }: NetWorthChartProps) => {
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y' | 'All'>('1y');

  return (
    <div className="w-full mb-8" style={{ marginTop: "-150px" }}>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-600">Net Worth Trend</h3>
          <p className="text-2xl font-bold">$4.48B</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-emerald-600 text-sm font-medium mr-6">
            <TrendingUp className="h-4 w-4 mr-1" /> +3.8% YTD
          </div>
          <div className="flex space-x-1">
            {(['1m', '3m', '6m', '1y', 'All'] as const).map((range) => (
              <Button 
                key={range}
                variant={timeRange === range ? "secondary" : "ghost"} 
                size="sm"
                className="text-xs h-7 px-2"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-80 w-full mt-1">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={performanceData}
              margin={{ top: 0, right: 0, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }} 
                tickLine={false} 
                axisLine={false}
                dy={5}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#000000" 
                fillOpacity={1}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};

export default NetWorthChart;
