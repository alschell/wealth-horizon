
import { ChartDataPoint, IndexData } from "../types";

export const generateChartData = (indexName: string, indices: IndexData[]): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const foundIndex = indices.find(i => i.name === indexName);
  
  const startValue = foundIndex?.value ?? 
    foundIndex?.data?.c ?? 
    4000;
  
  const volatility = Math.random() * 0.5 + 0.5;
  
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
