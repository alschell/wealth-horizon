
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

/**
 * CommoditiesCard displays key commodity prices and trends
 * 
 * @returns Commodities visualization card component
 */
export const CommoditiesCard: React.FC = () => {
  // Mock data - in a real app, this would come from an API
  const commoditiesData = [
    { name: "Gold", price: "$1,982.45", change: 0.32, 
      data: [
        { date: "Sep 1", value: 1950 },
        { date: "Sep 2", value: 1945 },
        { date: "Sep 3", value: 1960 },
        { date: "Sep 4", value: 1975 },
        { date: "Sep 5", value: 1982 },
      ] 
    },
    { name: "Oil (WTI)", price: "$72.18", change: -1.54,
      data: [
        { date: "Sep 1", value: 74 },
        { date: "Sep 2", value: 73.5 },
        { date: "Sep 3", value: 73 },
        { date: "Sep 4", value: 72.5 },
        { date: "Sep 5", value: 72.18 },
      ]
    },
    { name: "Silver", price: "$23.67", change: 0.85,
      data: [
        { date: "Sep 1", value: 23.2 },
        { date: "Sep 2", value: 23.3 },
        { date: "Sep 3", value: 23.4 },
        { date: "Sep 4", value: 23.5 },
        { date: "Sep 5", value: 23.67 },
      ]
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Commodities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {commoditiesData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <span>{item.price}</span>
                  <span className={`text-xs ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change}%
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={item.data}>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={['dataMin', 'dataMax']} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}`, item.name]}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Line 
                    type="monotone"
                    dataKey="value"
                    stroke={item.change >= 0 ? "#4ade80" : "#f87171"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
