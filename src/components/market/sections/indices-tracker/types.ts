
import { Quote } from "@/types/market";

export interface IndexData {
  id: string;
  name: string;
  symbol: string;
  data: Quote;
  // Additional properties used in the components
  region?: string;
  exchange?: string;
  volume?: number;
}

export interface IndicesTrackerProps {
  indices?: IndexData[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
