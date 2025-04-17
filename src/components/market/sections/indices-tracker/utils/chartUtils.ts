
import { ChartDataPoint, IndexData } from "../types";

// Generate mock chart data for the selected index
export const generateChartData = (indexName: string, indices: IndexData[]): ChartDataPoint[] => {
  // This would come from a real API in a production app
  const data: ChartDataPoint[] = [];
  const foundIndex = indices.find(i => i.name === indexName);
  const startValue = foundIndex ? foundIndex.value : 4000; // Use the number value directly
  const volatility = Math.random() * 0.5 + 0.5; // Random volatility factor
  
  // Generate 30 days of data
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.5) * volatility * 50;
    const value = startValue + change * (30 - i) / 10;
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return data;
};
