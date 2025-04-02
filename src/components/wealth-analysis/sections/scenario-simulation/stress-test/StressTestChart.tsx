
import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type StressTestChartProps = {
  data: any[];
  config: {
    baseline: { label: string; color: string };
    marketCrash: { label: string; color: string };
    recession: { label: string; color: string };
    inflation: { label: string; color: string };
  };
};

const StressTestChart = ({ data, config }: StressTestChartProps) => {
  return (
    <ChartContainer config={config}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />} 
            formatter={(value) => [`$${(Number(value)).toLocaleString()}`, '']}
          />
          <Line type="monotone" dataKey="baseline" stroke="#3B82F6" strokeWidth={2} />
          <Line type="monotone" dataKey="marketCrash" stroke="#EF4444" strokeWidth={2} />
          <Line type="monotone" dataKey="recession" stroke="#F59E0B" strokeWidth={2} />
          <Line type="monotone" dataKey="inflation" stroke="#8B5CF6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default StressTestChart;
