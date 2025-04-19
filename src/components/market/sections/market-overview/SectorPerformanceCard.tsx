
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

/**
 * SectorPerformanceCard displays sector performance data in a card format with a bar chart
 * 
 * @returns Sector Performance Card component with chart visualization
 */
export const SectorPerformanceCard: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const sectorData = [
    { name: "Technology", value: 2.34 },
    { name: "Healthcare", value: 1.56 },
    { name: "Financial", value: -0.23 },
    { name: "Consumer", value: 0.89 },
    { name: "Energy", value: -1.45 },
    { name: "Utilities", value: 0.44 },
    { name: "Real Estate", value: -0.78 },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Sector Performance</CardTitle>
          <Badge variant="outline" className="text-xs">Daily</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={sectorData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis type="number" domain={['dataMin', 'dataMax']} tickFormatter={(value) => `${value}%`} />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Performance']}
              labelFormatter={(label) => `${label}`}
            />
            <Bar dataKey="value" fill="#9b87f5" radius={4}>
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.value >= 0 ? "#4ade80" : "#f87171"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
