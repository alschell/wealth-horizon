
import { Quote, IndexData } from "@/types/market";

export const createIndexData = (
  id: string,
  name: string,
  symbol: string,
  value: number,
  change: number,
  percentChange: number,
  region: string,
  description: string,
  volume: number,
  quoteData?: Quote
): IndexData => {
  return {
    symbol,
    data: quoteData || {
      c: value,
      d: change,
      dp: percentChange,
      h: value,
      l: value,
      o: value,
      pc: value - change,
      t: Date.now()
    },
    id,
    name,
    region,
    description
  };
};
