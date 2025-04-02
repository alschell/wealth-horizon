
import React from "react";
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type MonteCarloChartProps = {
  data: any[];
  config: {
    median: { label: string; color: string };
    p25: { label: string; color: string };
    p75: { label: string; color: string };
    min: { label: string; color: string };
    max: { label: string; color: string };
  };
};

const MonteCarloChart = ({ data, config }: MonteCarloChartProps) => {
  return (
    <ChartContainer config={config} className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
        ><defs>
            <linearGradient id="colorP25P75" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" />
          <YAxis 
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />} 
            formatter={(value) => [`$${(Number(value)).toLocaleString()}`, '']}
          />
          <Area type="monotone" dataKey="p25" stackId="1" stroke="#D1D5DB" fillOpacity={0} />
          <Area type="monotone" dataKey="p75" stackId="1" stroke="#D1D5DB" fill="url(#colorP25P75)" />
          <Line type="monotone" dataKey="min" stroke="#EF4444" strokeWidth={1} strokeDasharray="3 3" dot={false} />
          <Line type="monotone" dataKey="median" stroke="#3B82F6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="max" stroke="#10B981" strokeWidth={1} strokeDasharray="3 3" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MonteCarloChart;
