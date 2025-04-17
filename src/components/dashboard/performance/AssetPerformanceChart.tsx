
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';

interface AssetPerformanceChartProps {
  asset: {
    id: string;
    name: string;
    value: string;
    change: string;
    isPositive: boolean;
  } | null;
}

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

const AssetPerformanceChart: React.FC<AssetPerformanceChartProps> = ({ asset }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  // Generate mock data based on asset and time range
  const generateMockData = () => {
    if (!asset) return [];

    const numPoints = timeRangeToPoints(timeRange);
    const baseValue = parseFloat(asset.value.replace(/[$B,M]/g, '')) * (asset.value.includes('B') ? 1000000000 : asset.value.includes('M') ? 1000000 : 1);
    const volatility = baseValue * 0.05; // 5% volatility

    const startDate = getStartDate(timeRange);
    const data = [];

    for (let i = 0; i <= numPoints; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + (i * getDaysIncrement(timeRange)));

      // Create some random but trending data
      const changeDirection = asset.isPositive ? 1 : -1;
      const trend = (i / numPoints) * baseValue * (asset.isPositive ? 0.08 : -0.05);
      const randomFactor = (Math.random() - 0.5) * volatility;
      
      const value = baseValue + trend + randomFactor;
      
      data.push({
        date: formatDate(date, timeRange),
        value: Math.max(value, baseValue * 0.7) // Don't let it go too low
      });
    }

    return data;
  };

  const timeRangeToPoints = (range: TimeRange): number => {
    switch (range) {
      case '1D': return 24; // Hourly
      case '1W': return 7; // Daily
      case '1M': return 30; // Daily
      case '3M': return 12; // Weekly
      case '1Y': return 12; // Monthly
      case '5Y': return 20; // Quarterly
      default: return 30;
    }
  };

  const getDaysIncrement = (range: TimeRange): number => {
    switch (range) {
      case '1D': return 0; // Hours, not days
      case '1W': return 1;
      case '1M': return 1;
      case '3M': return 7;
      case '1Y': return 30;
      case '5Y': return 90;
      default: return 1;
    }
  };

  const getStartDate = (range: TimeRange): Date => {
    const today = new Date();
    switch (range) {
      case '1D':
        return new Date(today.setHours(today.getHours() - 24));
      case '1W':
        return new Date(today.setDate(today.getDate() - 7));
      case '1M':
        return new Date(today.setMonth(today.getMonth() - 1));
      case '3M':
        return new Date(today.setMonth(today.getMonth() - 3));
      case '1Y':
        return new Date(today.setFullYear(today.getFullYear() - 1));
      case '5Y':
        return new Date(today.setFullYear(today.getFullYear() - 5));
      default:
        return new Date(today.setMonth(today.getMonth() - 1));
    }
  };

  const formatDate = (date: Date, range: TimeRange): string => {
    if (range === '1D') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (range === '1W' || range === '1M') {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else if (range === '3M' || range === '1Y') {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString([], { year: 'numeric', month: 'short' });
    }
  };

  const chartData = generateMockData();

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      // Use Number() to convert ValueType to number
      const value = Number(payload[0].value);
      
      return (
        <div className="bg-white p-2 shadow rounded border border-gray-100">
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-bold">{formatCurrency(value)}</p>
        </div>
      );
    }
    return null;
  };

  if (!asset) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p className="text-gray-500">Select an asset to view performance</p>
        </CardContent>
      </Card>
    );
  }

  // Extract numeric value
  const valueNumber = parseFloat(asset.value.replace(/[$B,M]/g, ''));
  // Process multiplier based on suffix
  const multiplier = asset.value.includes('B') ? 1000000000 : asset.value.includes('M') ? 1000000 : 1;
  // Calculate min and max for YAxis
  const minValue = Math.min(...chartData.map(d => Number(d.value))) * 0.98;
  const maxValue = Math.max(...chartData.map(d => Number(d.value))) * 1.02;

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{asset.name}</CardTitle>
          <div className="text-right">
            <p className="text-xl font-bold">{asset.value}</p>
            <p className={`text-sm ${asset.isPositive ? 'text-green-600' : 'text-red-500'}`}>
              {asset.change}
            </p>
          </div>
        </div>
        <Tabs defaultValue={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)} className="mt-2">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="1D">1D</TabsTrigger>
            <TabsTrigger value="1W">1W</TabsTrigger>
            <TabsTrigger value="1M">1M</TabsTrigger>
            <TabsTrigger value="3M">3M</TabsTrigger>
            <TabsTrigger value="1Y">1Y</TabsTrigger>
            <TabsTrigger value="5Y">5Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop 
                    offset="5%" 
                    stopColor={asset.isPositive ? "#10b981" : "#ef4444"} 
                    stopOpacity={0.2}
                  />
                  <stop 
                    offset="95%" 
                    stopColor={asset.isPositive ? "#10b981" : "#ef4444"} 
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[minValue, maxValue]}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => formatCurrency(Number(value), 'USD', 'en-US').split('.')[0]}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={asset.isPositive ? "#10b981" : "#ef4444"} 
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetPerformanceChart;
