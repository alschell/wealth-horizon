
import { Quote, IndexData } from "../types";

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
    id,
    name,
    symbol,
    value,
    change,
    percentChange,
    region,
    description,
    volume,
    data: quoteData || {
      c: value,
      d: change,
      dp: percentChange,
      h: value,
      l: value,
      o: value,
      pc: value - change,
      t: Date.now()
    }
  };
};
