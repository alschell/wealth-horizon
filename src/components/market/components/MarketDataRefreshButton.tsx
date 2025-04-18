
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useMarketDataRefresh } from "@/hooks/market-data";
import { toast } from "@/hooks/use-toast";
import type { RefreshableMarketDataType } from "@/hooks/market-data/types";

interface MarketDataRefreshButtonProps {
  /** Data types to refresh */
  types: RefreshableMarketDataType[];
  /** Symbol to refresh data for (if applicable) */
  symbol?: string;
  /** Variant for the button */
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
  /** Size of the button */
  size?: "default" | "sm" | "lg" | "icon";
  /** Additional className for the button */
  className?: string;
}

/**
 * A button component that refreshes market data
 * 
 * @example
 * ```tsx
 * <MarketDataRefreshButton 
 *   types={['quote', 'indices']} 
 *   symbol="AAPL" 
 * />
 * ```
 */
const MarketDataRefreshButton: React.FC<MarketDataRefreshButtonProps> = ({
  types,
  symbol,
  variant = "outline",
  size = "sm",
  className
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshMarketData = useMarketDataRefresh();
  
  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      // Call the refresh function directly with the types array and options
      const success = await refreshMarketData(types, { 
        symbol,
        showToast: false // We'll handle our own toast
      });
      
      if (success) {
        toast({
          title: "Data refreshed",
          description: `Latest market data has been loaded`,
          variant: "default"
        });
      } else {
        toast({
          title: "Could not refresh data",
          description: "Please try again later",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error refreshing market data:", error);
      toast({
        title: "Error refreshing data",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={className}
      title="Refresh market data"
      aria-label="Refresh market data"
    >
      <RefreshCw 
        className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
      />
      {size !== 'icon' && <span className="ml-2">Refresh</span>}
    </Button>
  );
};

export default MarketDataRefreshButton;
