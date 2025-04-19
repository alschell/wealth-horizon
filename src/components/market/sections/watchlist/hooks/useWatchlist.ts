
import { useState } from "react";
import { toast } from "sonner";
import { WatchlistItem } from "../types";

/**
 * Custom hook to manage watchlist functionality
 * Handles state management for watchlists, filtering, dialog state, and watchlist operations
 * 
 * @returns State and handler functions for watchlist management
 */
export const useWatchlist = () => {
  // State for tabs and watchlists
  const [activeTab, setActiveTab] = useState("stocks");
  const [activeWatchlist, setActiveWatchlist] = useState("default");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWatchlistName, setNewWatchlistName] = useState("");
  
  // Mock watchlist data - would come from API in real app
  const [watchlists, setWatchlists] = useState([
    { id: "default", name: "Default Watchlist" },
    { id: "tech", name: "Tech Stocks" },
    { id: "dividends", name: "Dividend Payers" },
  ]);
  
  const watchlistItems = {
    stocks: [
      { id: "1", symbol: "AAPL", name: "Apple Inc.", price: "183.27", change: 1.25, subscribed: true },
      { id: "2", symbol: "MSFT", name: "Microsoft Corp.", price: "406.32", change: 0.78, subscribed: true },
      { id: "3", symbol: "GOOGL", name: "Alphabet Inc.", price: "145.12", change: -0.45, subscribed: true },
      { id: "4", symbol: "AMZN", name: "Amazon.com Inc.", price: "178.89", change: 2.12, subscribed: false },
      { id: "5", symbol: "NVDA", name: "NVIDIA Corp.", price: "875.27", change: 3.45, subscribed: false },
    ],
    indices: [
      { id: "1", symbol: "SPX", name: "S&P 500", price: "4,587.20", change: 0.85, subscribed: true },
      { id: "2", symbol: "NDX", name: "Nasdaq 100", price: "15,874.56", change: 1.1, subscribed: true },
      { id: "3", symbol: "DJI", name: "Dow Jones Industrial", price: "36,124.56", change: 0.32, subscribed: false },
    ],
    crypto: [
      { id: "1", symbol: "BTC", name: "Bitcoin", price: "51,234.85", change: -2.15, subscribed: true },
      { id: "2", symbol: "ETH", name: "Ethereum", price: "2,876.42", change: -1.32, subscribed: false },
    ],
  };
  
  // Filter items based on search
  const filteredItems = watchlistItems[activeTab as keyof typeof watchlistItems].filter(item => {
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.symbol.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  // Toggle subscription
  const toggleSubscription = (id: string) => {
    // In a real app, this would update the state through an API call
    console.log(`Toggling subscription for item ${id}`);
  };

  // Handle create watchlist
  const handleCreateWatchlist = () => {
    if (!newWatchlistName.trim()) {
      toast.error("Please enter a watchlist name");
      return;
    }
    
    const newId = `watchlist-${Date.now()}`;
    const newWatchlist = {
      id: newId,
      name: newWatchlistName,
    };
    
    setWatchlists(prev => [...prev, newWatchlist]);
    setActiveWatchlist(newId);
    setNewWatchlistName("");
    setIsCreateDialogOpen(false);
    toast.success(`Watchlist "${newWatchlistName}" created successfully`);
  };

  return {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    activeWatchlist,
    setActiveWatchlist,
    watchlists,
    filteredItems,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    newWatchlistName,
    setNewWatchlistName,
    toggleSubscription,
    handleCreateWatchlist
  };
};
