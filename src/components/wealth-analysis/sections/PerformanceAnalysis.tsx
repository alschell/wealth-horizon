
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

const PerformanceAnalysis = () => {
  const [timeframe, setTimeframe] = useState<'1y' | '3y' | '5y' | '10y'>('3y');

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Performance Analysis</CardTitle>
          <div className="flex space-x-1">
            {(['1y', '3y', '5y', '10y'] as const).map((period) => (
              <Button
                key={period}
                variant={timeframe === period ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(period)}
                className={`${timeframe === period ? 'bg-black text-white' : 'text-gray-600'}`}
              >
                {period}
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
