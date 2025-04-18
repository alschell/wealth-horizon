
export interface IndexData {
  id: string;
  name: string;
  value: number;
  change: number;
  percentChange: number;
}

export interface IndicesTrackerProps {
  indices: IndexData[];
}
