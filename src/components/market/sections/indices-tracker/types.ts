
import { Quote } from "@/utils/market-data/types";

export interface IndexData {
  symbol: string;
  name: string;
  region: string;
  data?: Quote;
  currentValue: string;
  change: string;
  isPositive: boolean;
  id?: string;
  volume?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
