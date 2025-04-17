
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MarketItemVisibility, MarketItem } from "@/types/market";
import { useNavigate } from "react-router-dom";
import { useIndices, useQuote } from "@/hooks/useMarketData";
import { CACHE_KEYS, saveToCache, getFromCache } from "@/utils/market-data/cache";
import { toast } from "sonner";

// Default visible items
const DEFAULT_VISIBLE_ITEMS = [
  "sp500", "nasdaq", "djia", "ftse", "nikkei", "eur-usd", "btc-usd", "gold", "wti-crude"
];

export function useMarketSnapshot() {
  const navigate = useNavigate();
  
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [marketItems, setMarketItems] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use localStorage to persist user's preferences
  const [visibility, setVisibility] = useLocalStorage<MarketItemVisibility>("market-snapshot-visibility", {
    visibleItems: DEFAULT_VISIBLE_ITEMS,
    itemOrder: DEFAULT_VISIBLE_ITEMS
  });
  
  // While customizing, we don't want to immediately apply changes
  const [temporarySelection, setTemporarySelection] = useState<string[]>(visibility.visibleItems);
  const [temporaryOrder, setTemporaryOrder] = useState<string[]>(visibility.itemOrder);
  
  // Fetch indices data
  const { data: indicesData } = useIndices();
  
  // Format market items from API data
  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        // Try to get cached data as fallback
        const cachedItems = getFromCache<MarketItem[]>(CACHE_KEYS.MARKET_ITEMS);
        
        let newMarketItems: MarketItem[] = [];
        
        // If we have indices data from the API
        if (indicesData && indicesData.length > 0) {
          // Map indices to market items
          const indicesItems = indicesData.map(index => {
            if (!index.data) return null;
            
            // Convert index symbol to market item id
            let id = '';
            let label = '';
            let category = 'Indices';
            
            switch (index.symbol) {
              case '^GSPC':
                id = 'sp500';
                label = 'S&P 500';
                break;
              case '^DJI':
                id = 'djia';
                label = 'Dow Jones';
                break;
              case '^IXIC':
                id = 'nasdaq';
                label = 'NASDAQ';
                break;
              case '^FTSE':
                id = 'ftse';
                label = 'FTSE 100';
                break;
              case '^N225':
                id = 'nikkei';
                label = 'Nikkei 225';
                break;
              default:
                // Use the symbol as id and label for other indices
                id = index.symbol.toLowerCase().replace('^', '');
                label = index.symbol.replace('^', '');
            }
            
            return {
              id,
              label,
              value: index.data.c.toFixed(2),
              change: `${index.data.dp >= 0 ? '+' : ''}${index.data.dp.toFixed(2)}%`,
              category
            } as MarketItem;
          }).filter(Boolean) as MarketItem[];
          
          newMarketItems = [...newMarketItems, ...indicesItems];
          
          // Add some forex, crypto and commodities for now (would be replaced with real API data)
          // In a real implementation, these would come from their respective APIs
          // For now using static data but with real formatting
          const additionalItems: MarketItem[] = [
            { id: "eur-usd", label: "EUR/USD", value: "1.0875", change: "+0.15%", category: "Currencies" },
            { id: "gbp-usd", label: "GBP/USD", value: "1.2650", change: "-0.23%", category: "Currencies" },
            { id: "btc-usd", label: "Bitcoin", value: "$51,234.85", change: "-2.15%", category: "Cryptocurrencies" },
            { id: "eth-usd", label: "Ethereum", value: "$2,876.42", change: "-1.32%", category: "Cryptocurrencies" },
            { id: "gold", label: "Gold", value: "$2,356.70", change: "+0.75%", category: "Commodities" },
            { id: "wti-crude", label: "Crude Oil", value: "$75.46", change: "-0.65%", category: "Commodities" },
            { id: "silver", label: "Silver", value: "$28.12", change: "+1.15%", category: "Commodities" },
          ];
          
          newMarketItems = [...newMarketItems, ...additionalItems];
          
          // Cache the new market items for fallback
          saveToCache(CACHE_KEYS.MARKET_ITEMS, newMarketItems);
        } else if (cachedItems) {
          // Use cached items if API data is not available
          newMarketItems = cachedItems;
          console.log("Using cached market items data");
          toast.info("Using cached market data", {
            description: "We're temporarily using cached data while connecting to the server."
          });
        } else {
          // Fallback to generated data if no API data and no cache
          console.log("No API data or cache available, using generated data");
          newMarketItems = generateFallbackMarketItems();
          toast.warning("No market data available", {
            description: "We're temporarily using sample data while resolving a connection issue."
          });
        }
        
        setMarketItems(newMarketItems);
      } catch (error) {
        console.error("Error fetching market data:", error);
        // If everything fails, use generated data
        const fallbackData = generateFallbackMarketItems();
        setMarketItems(fallbackData);
        toast.error("Error loading market data", {
          description: "We're temporarily using backup data. Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMarketData();
  }, [indicesData]);
  
  // Generate fallback market items (only used if API and cache both fail)
  const generateFallbackMarketItems = () => [
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
  
  // All available market items
  const allMarketItems = marketItems;
  
  // Filtered and ordered items based on user preferences
  const filteredAndOrderedItems = visibility.itemOrder
    .filter(id => visibility.visibleItems.includes(id))
    .map(id => allMarketItems.find(item => item.id === id))
    .filter(Boolean) as MarketItem[];
  
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
    allMarketItems,
    isLoading
  };
}
