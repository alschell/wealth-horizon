
import React from "react";
import { TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

type NetWorthChartProps = {
  performanceData: {
    month: string;
    value: number;
  }[];
  chartConfig: any;
};

const NetWorthChart = ({ performanceData, chartConfig }: NetWorthChartProps) => {
  return (
    <div className="w-full mb-16">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-600">Net Worth Trend</h3>
          <p className="text-2xl font-bold">$4.48B</p>
        </div>
        <div className="flex items-center text-emerald-600 text-sm font-medium">
          <TrendingUp className="h-4 w-4 mr-1" /> +3.8% YTD
        </div>
      </div>
      <div className="h-72 w-full mt-6">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} dy={5} />
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
