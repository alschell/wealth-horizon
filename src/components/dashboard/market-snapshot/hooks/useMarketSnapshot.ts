
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MarketItemVisibility } from "@/types/market";
import { useNavigate } from "react-router-dom";

// Generate sample market data
const generateMarketItems = () => [
  // Indices
  { id: "sp500", label: "S&P 500", value: "4,587.20", change: "+0.65%", category: "Indices" },
  { id: "nasdaq", label: "NASDAQ", value: "14,346.30", change: "+1.20%", category: "Indices" },
  { id: "djia", label: "Dow Jones", value: "36,124.56", change: "+0.32%", category: "Indices" },
  { id: "ftse", label: "FTSE 100", value: "7,582.10", change: "-0.32%", category: "Indices" },
  { id: "nikkei", label: "Nikkei 225", value: "37,156.45", change: "+1.45%", category: "Indices" },
  
  // Currencies
  { id: "eur-usd", label: "EUR/USD", value: "1.0875", change: "+0.15%", category: "Currencies" },
  { id: "gbp-usd", label: "GBP/USD", value: "1.2650", change: "-0.23%", category: "Currencies" },
  { id: "usd-jpy", label: "USD/JPY", value: "151.25", change: "+0.42%", category: "Currencies" },
  { id: "usd-cad", label: "USD/CAD", value: "1.3575", change: "+0.08%", category: "Currencies" },
  
  // Cryptocurrencies
  { id: "btc-usd", label: "Bitcoin", value: "$51,234.85", change: "-2.15%", category: "Cryptocurrencies" },
  { id: "eth-usd", label: "Ethereum", value: "$2,876.42", change: "-1.32%", category: "Cryptocurrencies" },
  
  // Commodities
  { id: "gold", label: "Gold", value: "$2,356.70", change: "+0.75%", category: "Commodities" },
  { id: "wti-crude", label: "Crude Oil", value: "$75.46", change: "-0.65%", category: "Commodities" },
  { id: "silver", label: "Silver", value: "$28.12", change: "+1.15%", category: "Commodities" },
];

const DEFAULT_VISIBLE_ITEMS = [
  "sp500", "nasdaq", "djia", "ftse", "nikkei", "eur-usd", "btc-usd", "gold", "wti-crude"
];

export function useMarketSnapshot() {
  const navigate = useNavigate();
  
  const [isCustomizing, setIsCustomizing] = useState(false);
  
  // Use localStorage to persist user's preferences
  const [visibility, setVisibility] = useLocalStorage<MarketItemVisibility>("market-snapshot-visibility", {
    visibleItems: DEFAULT_VISIBLE_ITEMS,
    itemOrder: DEFAULT_VISIBLE_ITEMS
  });
  
  // While customizing, we don't want to immediately apply changes
  const [temporarySelection, setTemporarySelection] = useState<string[]>(visibility.visibleItems);
  const [temporaryOrder, setTemporaryOrder] = useState<string[]>(visibility.itemOrder);
  
  // All available market items
  const allMarketItems = generateMarketItems();
  
  // Filtered and ordered items based on user preferences
  const filteredAndOrderedItems = temporaryOrder
    .filter(id => visibility.visibleItems.includes(id))
    .map(id => allMarketItems.find(item => item.id === id))
    .filter(Boolean);
  
  // Open the customization dialog
  const handleCustomizeOpen = () => {
    setTemporarySelection(visibility.visibleItems);
    setTemporaryOrder(visibility.itemOrder);
    setIsCustomizing(true);
  };
  
  // Save customization changes
  const handleCustomizeSave = () => {
    setVisibility({
      visibleItems: temporarySelection,
      itemOrder: temporaryOrder.filter(id => temporarySelection.includes(id))
    });
    setIsCustomizing(false);
  };
  
  // Toggle item visibility in the customization dialog
  const toggleItem = (id: string) => {
    setTemporarySelection(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  // Handle drag and drop reordering
  const handleDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    const items = Array.from(temporaryOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTemporaryOrder(items);
  };
  
  // Handle click on market item
  const handleMarketItemClick = (itemId: string) => {
    // Instead of navigating, we'll handle the dialog open in the MarketItemsGrid component
  };
  
  return {
    isCustomizing,
    setIsCustomizing,
    filteredAndOrderedItems,
    handleCustomizeOpen,
    handleCustomizeSave,
    temporarySelection,
    temporaryOrder,
    toggleItem,
    handleDragEnd,
    handleMarketItemClick,
    allMarketItems
  };
}
