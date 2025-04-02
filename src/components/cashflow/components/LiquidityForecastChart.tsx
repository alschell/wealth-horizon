
import React from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from "recharts";

// Mock data for liquidity forecast
const generateForecastData = (timeRange: string, currency: string) => {
  // Generate data based on time range
  const dataPointCount = timeRange === "1m" ? 30 : 
                          timeRange === "3m" ? 90 : 
                          timeRange === "6m" ? 180 : 
                          365; // 1y
  
  const interval = dataPointCount === 30 ? 1 : 
                    dataPointCount === 90 ? 3 : 
                    dataPointCount === 180 ? 6 : 
                    12; // yearly
                    
  const baseAmount = currency === "USD" ? 2500000 : 
                     currency === "EUR" ? 1500000 :
                     currency === "GBP" ? 650000 :
                     currency === "CHF" ? 900000 :
                     85000000; // JPY
                     
  const data = [];
  let currentAmount = baseAmount;
  
  for (let i = 0; i < dataPointCount; i += interval) {
    // Add some random fluctuation
    const fluctuation = Math.random() * 0.08 - 0.04; // -4% to 4%
    currentAmount = currentAmount * (1 + fluctuation);
    
    // Create low and high thresholds
    const minRequired = baseAmount * 0.8;
    const maxTarget = baseAmount * 1.2;
    
    // Add scheduled inflows and outflows
    const hasInflowEvent = Math.random() < 0.2;
    const hasOutflowEvent = Math.random() < 0.25;
    
    const inflow = hasInflowEvent ? baseAmount * (Math.random() * 0.1 + 0.05) : 0; // 5-15% inflow
    const outflow = hasOutflowEvent ? baseAmount * (Math.random() * 0.1 + 0.03) : 0; // 3-13% outflow
    
    // Date calculation
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' }),
      balance: currentAmount,
      minRequired,
      maxTarget,
      inflow,
      outflow,
      timestamp: date.getTime()
    });
    
    // Apply the inflows and outflows for next iteration
    currentAmount += (inflow - outflow);
  }
  
  return data;
};

interface LiquidityForecastChartProps {
  timeRange: string;
  currency: string;
}

export const LiquidityForecastChart: React.FC<LiquidityForecastChartProps> = ({ timeRange, currency }) => {
  const forecastData = generateForecastData(timeRange, currency);
  
  const formatYAxis = (value: number) => {
    if (currency === "JPY") {
      return `${(value / 1000000).toFixed(1)}M ¥`;
    }
    return `${(value / 1000000).toFixed(1)}M ${currency}`;
  };
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={forecastData}
        margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          interval={forecastData.length > 60 ? 14 : 7}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tickFormatter={formatYAxis}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          formatter={(value: number) => [
            `${currency} ${value.toLocaleString()}`, 
            ""
          ]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        
        <ReferenceLine 
          y={forecastData[0].minRequired} 
          label="Min Required" 
          stroke="red" 
          strokeDasharray="3 3" 
        />
        <ReferenceLine 
          y={forecastData[0].maxTarget} 
          label="Target Max" 
          stroke="green" 
          strokeDasharray="3 3" 
        />
        
        <Area 
          type="monotone" 
          dataKey="balance" 
          stroke="#3B82F6" 
          fillOpacity={1} 
          fill="url(#colorBalance)" 
          name="Projected Balance"
        />
        
        {/* Inflow and outflow markers */}
        {forecastData.map((entry, index) => {
          if (entry.inflow > 0) {
            return (
              <ReferenceLine 
                key={`inflow-${index}`} 
                x={entry.date} 
                stroke="green" 
                strokeWidth={entry.inflow > (forecastData[0].baseAmount * 0.1) ? 2 : 1}
                opacity={0.7}
              />
            );
          }
          return null;
        })}
        
        {forecastData.map((entry, index) => {
          if (entry.outflow > 0) {
            return (
              <ReferenceLine 
                key={`outflow-${index}`} 
                x={entry.date} 
                stroke="red" 
                strokeWidth={entry.outflow > (forecastData[0].baseAmount * 0.1) ? 2 : 1}
                opacity={0.7}
              />
            );
          }
          return null;
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};
