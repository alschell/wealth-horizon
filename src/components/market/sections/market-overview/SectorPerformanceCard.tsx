
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export const SectorPerformanceCard = () => {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle>Market Sectors</CardTitle>
          <Button variant="ghost" className="text-xs flex items-center gap-1 text-gray-500">
            View All <ArrowUpRight size={14} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ChartContainer config={{
            value: {
              label: "Performance",
              color: "#666666"
            }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                {name: 'Technology', value: 3.2},
                {name: 'Healthcare', value: 1.5},
                {name: 'Financials', value: -0.8},
                {name: 'Energy', value: 2.1},
                {name: 'Consumer', value: 0.5},
                {name: 'Utilities', value: -0.3},
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis tick={{ fontSize: 12 }} tickMargin={10} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#666666" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#666666" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#666666" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
