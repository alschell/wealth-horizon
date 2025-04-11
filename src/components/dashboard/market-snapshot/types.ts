
// Define types for market snapshot components
export type MarketItem = {
  id: string;
  label: string;
  value: string;
  change: string;
  category: string;
};

export type MarketItemVisibility = {
  visibleItems: string[];
  itemOrder: string[];
};
