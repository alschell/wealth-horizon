
export type MarketCategory = "Indices" | "Commodities" | "Currencies" | "Cryptocurrencies" | "Bonds";

export interface MarketItem {
  id: string;
  name: string;
  ticker: string;
  category: MarketCategory;
  value: string;
  change: string;
  changePercent: string;
  isUp: boolean;
}
