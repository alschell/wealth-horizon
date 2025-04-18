
import { Quote } from "@/types/market";

export interface IndexData {
  id: string;
  name: string;
  symbol: string;
  value?: number;
  change?: number;
  percentChange?: number;
  region?: string;
  exchange?: string;
  volume?: number;
  description?: string;
  data?: Quote;
}

export interface IndicesTrackerProps {
  indices?: IndexData[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
