
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface AssetPerformanceChartProps {
  asset: {
    id: string;
    name: string;
    value: string;
    change: string;
    isPositive: boolean;
  } | null;
}

// Helper function to generate random historical data
const generateHistoricalData = (days: number, startValue: number, volatility: number = 0.02) => {
  const data = [];
  let value = startValue;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some random variation
    const change = (Math.random() - 0.5) * 2 * volatility;
    value = value * (1 + change);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: value.toFixed(2),
    });
  }
  
  return data;
};

const AssetPerformanceChart: React.FC<AssetPerformanceChartProps> = ({ asset }) => {
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | '6m' | '1y' | 'all'>('1m');
  
  if (!asset) return null;
  
  // Extract numeric value from string for chart
  const valueNumber = parseFloat(asset.value.replace(/[^0-9.-]+/g, ""));
  
  // Generate different data sets based on time range
  const getDaysForRange = () => {
    switch (timeRange) {
      case '1w': return 7;
      case '1m': return 30;
      case '3m': return 90;
      case '6m': return 180;
      case '1y': return 365;
      case 'all': return 1825; // 5 years
      default: return 30;
    }
  };
  
  const chartData = generateHistoricalData(getDaysForRange(), valueNumber);
  
  // Create tick values for x-axis based on time range
  const getTickInterval = () => {
    switch (timeRange) {
      case '1w': return 1; // show every day
      case '1m': return 5; // show every 5 days
      case '3m': return 15; // show every 15 days
      case '6m': return 30; // show every month
      case '1y': return 60; // show every 2 months
      case 'all': return 365; // show every year
      default: return 5;
    }
  };
  
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    
    if (timeRange === '1w' || timeRange === '1m') {
      return date.getDate() + '/' + (date.getMonth() + 1);
    } else if (timeRange === '3m' || timeRange === '6m') {
      return (date.getMonth() + 1) + '/' + date.getDate();
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
    }
  };
  
  const chartColor = asset.isPositive ? "#10b981" : "#ef4444";
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{asset.name}</h3>
          <div className="flex items-center mt-1">
            <span className="font-bold text-lg mr-2">{asset.value}</span>
            <span className={`text-sm ${asset.isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
              {asset.change}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-1">
          {(['1w', '1m', '3m', '6m', '1y', 'all'] as const).map((range) => (
            <Button 
              key={range}
              variant={timeRange === range ? "default" : "outline"} 
              size="sm"
              className="text-xs h-7 px-2"
              onClick={() => setTimeRange(range)}
            >
              {range === 'all' ? 'All' : range}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis} 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              interval={getTickInterval()}
            />
            <YAxis 
              type="number" 
              domain={['auto', 'auto']} 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              tickFormatter={(value) => {
                const numValue = Number(value);
                if (numValue >= 1000000000) {
                  return `$${(numValue / 1000000000).toFixed(1)}B`;
                } else if (numValue >= 1000000) {
                  return `$${(numValue / 1000000).toFixed(1)}M`;
                } else if (numValue >= 1000) {
                  return `$${(numValue / 1000).toFixed(1)}K`;
                }
                return `$${value}`;
              }} 
            />
            <Tooltip 
              formatter={(value) => {
                const numValue = Number(value);
                if (numValue >= 1000000000) {
                  return [`$${(numValue / 1000000000).toFixed(2)}B`, "Value"];
                } else if (numValue >= 1000000) {
                  return [`$${(numValue / 1000000).toFixed(2)}M`, "Value"];
                } else if (numValue >= 1000) {
                  return [`$${(numValue / 1000).toFixed(2)}K`, "Value"];
                }
                return [`$${value}`, "Value"];
              }}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              strokeWidth={2} 
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetPerformanceChart;
