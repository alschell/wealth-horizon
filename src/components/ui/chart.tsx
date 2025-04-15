
import React, { createContext, useContext } from 'react';

// Define the context type
interface ChartContextType {
  config: Record<string, { label: string; color: string }>;
}

// Create the context with a default value
const ChartContext = createContext<ChartContextType>({
  config: {},
});

// Custom hook to use the chart context
export const useChartContext = () => useContext(ChartContext);

// Provider component to wrap charts
export const ChartContainer: React.FC<{
  children: React.ReactNode;
  config: Record<string, { label: string; color: string }>;
}> = ({ children, config }) => {
  return (
    <ChartContext.Provider value={{ config }}>
      {children}
    </ChartContext.Provider>
  );
};

// Custom tooltip component for charts
export const ChartTooltipContent = ({ active, payload, label }: any) => {
  const { config } = useChartContext();
  
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-white p-2 border rounded shadow-sm text-xs">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((entry: any, index: number) => {
        const dataKey = entry.dataKey;
        const value = entry.value;
        const color = config[dataKey]?.color || entry.color;
        const name = config[dataKey]?.label || dataKey;
        
        return (
          <div key={`tooltip-item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span>{name}: <span className="font-medium">{value}</span></span>
          </div>
        );
      })}
    </div>
  );
};

// Legend component for charts
export const ChartLegend: React.FC = () => {
  const { config } = useChartContext();
  
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {Object.entries(config).map(([key, { label, color }]) => (
        <div key={key} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
};

// Reexport components from recharts
export { Tooltip as ChartTooltip } from 'recharts';
