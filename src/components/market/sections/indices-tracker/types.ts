
export interface IndexData {
  id: string;
  name: string;
  value: string;
  change: number;
  volume: string;
  region: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}
