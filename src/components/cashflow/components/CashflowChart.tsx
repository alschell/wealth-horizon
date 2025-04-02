
import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for the cashflow chart
const cashflowData = [
  { month: 'Jan', inflows: 125000, outflows: 85000, netCash: 40000 },
  { month: 'Feb', inflows: 148000, outflows: 92000, netCash: 56000 },
  { month: 'Mar', inflows: 165000, outflows: 105000, netCash: 60000 },
  { month: 'Apr', inflows: 138000, outflows: 118000, netCash: 20000 },
  { month: 'May', inflows: 142000, outflows: 108000, netCash: 34000 },
  { month: 'Jun', inflows: 189000, outflows: 102000, netCash: 87000 },
  { month: 'Jul', inflows: 167000, outflows: 114000, netCash: 53000 },
  { month: 'Aug', inflows: 152000, outflows: 124000, netCash: 28000 },
  { month: 'Sep', inflows: 165000, outflows: 98000, netCash: 67000 },
  { month: 'Oct', inflows: 172000, outflows: 110000, netCash: 62000 },
  { month: 'Nov', inflows: 185000, outflows: 125000, netCash: 60000 },
  { month: 'Dec', inflows: 220000, outflows: 145000, netCash: 75000 },
];

const timeRanges = [
  { label: "Last 12 Months", value: "12m" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Last Quarter", value: "3m" },
  { label: "Year to Date", value: "ytd" },
];

const CashflowChart = () => {
  const [timeRange, setTimeRange] = useState("12m");
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "6m":
        return cashflowData.slice(6);
      case "3m":
        return cashflowData.slice(9);
      case "ytd":
        const currentMonth = new Date().getMonth();
        return cashflowData.slice(0, currentMonth + 1);
      default:
        return cashflowData;
    }
  };
  
  const filteredData = getFilteredData();
  const selectedRangeLabel = timeRanges.find(r => r.value === timeRange)?.label || "Last 12 Months";

  return (
    <Card className="h-[450px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Cash Flow Analysis</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto h-8">
              {selectedRangeLabel} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {timeRanges.map((range) => (
              <DropdownMenuItem 
                key={range.value}
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid #eaeaea"
              }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconSize={10}
              iconType="circle"
            />
            <ReferenceLine y={0} stroke="#000" opacity={0.3} />
            <Bar dataKey="inflows" stackId="a" fill="#10B981" name="Inflows" radius={[4, 4, 0, 0]} />
            <Bar dataKey="outflows" stackId="a" fill="#F43F5E" name="Outflows" radius={[4, 4, 0, 0]} />
            <Line 
              type="monotone" 
              dataKey="netCash" 
              stroke="#3B82F6" 
              name="Net Cash Flow" 
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CashflowChart;
