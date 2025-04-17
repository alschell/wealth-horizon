
export interface IndexData {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  percentChange: number;
  region: string;
  description: string;
}

export interface IndicesTrackerProps {
  preselectedIndex?: string;
}

export interface FilterOption {
  id: string;
  name: string;
}
