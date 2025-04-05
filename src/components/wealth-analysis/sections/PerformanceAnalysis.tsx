
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type TimeframeType = '1d' | '3d' | '1w' | '2w' | '1m' | '3m' | '6m' | '1y' | '2y' | '3y' | '5y' | '10y' | 'custom' | 'all';

const PerformanceAnalysis = () => {
  const [timeframe, setTimeframe] = useState<TimeframeType>('3m');

  // Sample data for the performance chart
  const performanceData = [
    { date: "2021-01", portfolio: 100, benchmark: 100 },
    { date: "2021-04", portfolio: 107, benchmark: 104 },
    { date: "2021-07", portfolio: 111, benchmark: 108 },
    { date: "2021-10", portfolio: 120, benchmark: 112 },
    { date: "2022-01", portfolio: 118, benchmark: 110 },
    { date: "2022-04", portfolio: 115, benchmark: 108 },
    { date: "2022-07", portfolio: 125, benchmark: 112 },
    { date: "2022-10", portfolio: 130, benchmark: 115 },
    { date: "2023-01", portfolio: 140, benchmark: 120 },
    { date: "2023-04", portfolio: 145, benchmark: 125 },
    { date: "2023-07", portfolio: 155, benchmark: 130 },
    { date: "2023-10", portfolio: 160, benchmark: 135 }
  ];

  // Chart config for the performance chart
  const chartConfig = {
    portfolio: {
      label: "Your Portfolio",
      color: "#000000"
    },
    benchmark: {
      label: "Benchmark (S&P 500)",
      color: "#9CA3AF"
    }
  };

  // Time options for the filter
  const timeOptions: TimeframeType[] = ['1d', '3d', '1w', '2w', '1m', '3m', '6m', '1y', '2y', '3y', '5y', '10y', 'custom', 'all'];
  
  // Formatting for display
  const timeframeDisplay = {
    '1d': '1 Day',
    '3d': '3 Days',
    '1w': '1 Week',
    '2w': '2 Weeks',
    '1m': '1 Month',
    '3m': '3 Months',
    '6m': '6 Months',
    '1y': '1 Year',
    '2y': '2 Years',
    '3y': '3 Years',
    '5y': '5 Years',
    '10y': '10 Years',
    'custom': 'Custom',
    'all': 'All Time'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap">
          <CardTitle>Performance Analysis</CardTitle>
          <div className="flex flex-wrap gap-1">
            {timeOptions.map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
                className={`${timeframe === period ? 'bg-black text-white' : 'text-gray-600'} text-xs`}
              >
                {timeframeDisplay[period]}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 10,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
                  <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="portfolio"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#9CA3AF"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Return</div>
              <div className="text-lg font-bold text-gray-700">+60.0%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Alpha</div>
              <div className="text-lg font-bold">+8.2%</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Sharpe Ratio</div>
              <div className="text-lg font-bold">1.73</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceAnalysis;
