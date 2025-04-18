
import { IndexData } from "../../types";

export const americasIndices: IndexData[] = [
  {
    id: "sp500",
    name: "S&P 500",
    symbol: "^GSPC",
    region: "United States",
    description: "Standard & Poor's 500 Index",
    volume: 2500000
  },
  {
    id: "nasdaq",
    name: "NASDAQ Composite",
    symbol: "^IXIC",
    region: "United States",
    description: "NASDAQ Composite Index",
    volume: 3800000
  },
  {
    id: "dowjones",
    name: "Dow Jones",
    symbol: "^DJI",
    region: "United States",
    description: "Dow Jones Industrial Average",
    volume: 2000000
  }
];
