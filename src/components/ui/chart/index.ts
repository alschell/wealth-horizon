
// Chart components
import { 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Brush,
  ReferenceLine
} from 'recharts';

export {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Brush,
  ReferenceLine
};

// Custom chart components
export const ChartContainer = ResponsiveContainer;
export const ChartTooltip = Tooltip;

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const ChartTooltipContent = (props: ChartTooltipContentProps) => {
  const { active, payload, label } = props;
  
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white shadow rounded border border-gray-100">
        <p className="text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  
  return null;
};

export interface ChartLegendContentProps {
  content: React.ReactNode;
}

export const ChartLegend = Legend;

export const ChartLegendContent = (props: ChartLegendContentProps) => {
  return <>{props.content}</>;
};
