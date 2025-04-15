
import React, { ReactNode } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart as RechartsAreaChart,
  Area,
} from "recharts";

// Export recharts components directly
export {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface ChartLegendContentProps {
  content: ReactNode;
  verticalAlign?: string;
  height?: number;
}

export const ChartLegendContent: React.FC<ChartLegendContentProps> = ({
  content,
  verticalAlign = "bottom",
  height = 36,
}) => {
  return (
    <div className="custom-legend">
      {content}
    </div>
  );
};

// Custom chart components
export const SimpleLineChart = ({ data, dataKey, stroke = "#8884d8" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke={stroke} />
    </RechartsLineChart>
  </ResponsiveContainer>
);

export const SimpleBarChart = ({ data, dataKey, fill = "#8884d8" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill={fill} />
    </RechartsBarChart>
  </ResponsiveContainer>
);

export const SimplePieChart = ({ data, dataKey, nameKey = "name", colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsPieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey={dataKey}
        nameKey={nameKey}
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </RechartsPieChart>
  </ResponsiveContainer>
);

export const SimpleAreaChart = ({ data, dataKey, stroke = "#8884d8", fill = "#8884d8" }) => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
    </RechartsAreaChart>
  </ResponsiveContainer>
);
