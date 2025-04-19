
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

interface MarketChartProps {
  chartData: any[];
  chartConfig: ChartConfig;
}

export const MarketChart: React.FC<MarketChartProps> = ({ chartData, chartConfig }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle>Major Indices - 9 Month Trend</CardTitle>
          <Button variant="ghost" className="text-xs flex items-center gap-1 text-gray-500">
            View Full Chart <ArrowUpRight size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full mt-2 mb-6 overflow-hidden">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="sp500" stroke="#333333" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="nasdaq" stroke="#666666" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="dowjones" stroke="#999999" strokeWidth={2} dot={false} />
                <ChartLegend content={<ChartLegendContent />} verticalAlign="bottom" height={36} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
