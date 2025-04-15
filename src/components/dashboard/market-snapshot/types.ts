
export interface MarketCategory {
  id: string;
  name: string;
}

export interface MarketItem {
  id: string;
  name: string;
  ticker: string;
  value: string;
  change: string;
  changePercent: number;
  isUp: boolean;
  category: MarketCategory;
  label?: string; // Adding this to solve the label reference errors
  isLarge?: boolean;
}

export interface MarketSettingsProps {
  allItems: MarketItem[];
  visibleItems: string[];
  itemOrder: string[];
  setVisibleItems: React.Dispatch<React.SetStateAction<string[]>>;
  setItemOrder: React.Dispatch<React.SetStateAction<string[]>>;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface MarketItemProps {
  item: MarketItem;
  isLarge?: boolean;
}
