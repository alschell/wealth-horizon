
import { IndexData } from "../types";

// Mock data - would come from API in real app
export const indices: IndexData[] = [
  { id: "1", name: "S&P 500", value: "4,587.20", change: 0.85, volume: "2.3B", region: "US" },
  { id: "2", name: "NASDAQ", value: "14,346.30", change: 1.2, volume: "1.9B", region: "US" },
  { id: "3", name: "Dow Jones", value: "36,124.56", change: 0.32, volume: "954M", region: "US" },
  { id: "4", name: "Russell 2000", value: "2,062.85", change: 1.74, volume: "845M", region: "US" },
  { id: "5", name: "FTSE 100", value: "7,582.10", change: -0.32, volume: "654M", region: "Europe" },
  { id: "6", name: "DAX", value: "15,947.80", change: -0.15, volume: "734M", region: "Europe" },
  { id: "7", name: "CAC 40", value: "7,185.35", change: -0.45, volume: "523M", region: "Europe" },
  { id: "8", name: "Nikkei 225", value: "37,156.45", change: 1.45, volume: "1.1B", region: "Asia" },
  { id: "9", name: "Hang Seng", value: "17,418.95", change: -0.86, volume: "1.5B", region: "Asia" },
  { id: "10", name: "Shanghai", value: "3,039.15", change: 0.47, volume: "23.2B", region: "Asia" },
];
