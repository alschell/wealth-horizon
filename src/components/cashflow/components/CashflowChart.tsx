
import React from "react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

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

const CashflowChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={cashflowData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis 
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip 
          formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
        />
        <Legend />
        <Bar dataKey="inflows" stackId="a" fill="#10B981" name="Inflows" />
        <Bar dataKey="outflows" stackId="a" fill="#F43F5E" name="Outflows" />
        <Line type="monotone" dataKey="netCash" stroke="#3B82F6" name="Net Cash Flow" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CashflowChart;
