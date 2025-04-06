
import React from "react";
import { LineChart, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const PortfolioPerformanceChart = () => {
  const navigate = useNavigate();
  
  // Sample portfolio performance data
  const data = [
    { month: "Jan", portfolio: 2450, benchmark: 2300 },
    { month: "Feb", portfolio: 2550, benchmark: 2400 },
    { month: "Mar", portfolio: 2700, benchmark: 2500 },
    { month: "Apr", portfolio: 2630, benchmark: 2570 },
    { month: "May", portfolio: 2800, benchmark: 2650 },
    { month: "Jun", portfolio: 2950, benchmark: 2750 }
  ];
  
  const chartConfig = {
    portfolio: {
      label: "Portfolio",
      color: "#000000"
    },
    benchmark: {
      label: "Benchmark",
      color: "#94A3B8"
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium flex items-center">
          <LineChart className="h-4 w-4 mr-1 text-gray-500" /> Portfolio Performance
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-xs text-gray-500 hover:text-gray-800"
          onClick={() => navigate("/wealth-analysis")}
        >
          <Maximize2 className="h-3 w-3 mr-1" />
          Expand
        </Button>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Compared to benchmarks
      </p>
      
      <div className="h-60 w-full">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} tickMargin={5} />
              <YAxis tick={{ fontSize: 10 }} tickMargin={5} />
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
                stroke="#94A3B8"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => navigate("/wealth-analysis")}
        >
          View Full Analysis
        </Button>
      </div>
    </div>
  );
};

export default PortfolioPerformanceChart;
