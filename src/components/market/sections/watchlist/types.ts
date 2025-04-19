
/**
 * Type definitions for Watchlist components
 */

/**
 * Represents a watchlist item (stock, index, crypto, etc.)
 */
export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: number;
  subscribed: boolean;
}

/**
 * Represents a watchlist
 */
export interface Watchlist {
  id: string;
  name: string;
}

/**
 * Props for the WatchlistHeader component
 */
export interface WatchlistHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  item: any; // Animation variant
}

/**
 * Props for the WatchlistSidebar component
 */
export interface WatchlistSidebarProps {
  watchlists: Watchlist[];
  activeWatchlist: string;
  setActiveWatchlist: (id: string) => void;
  setIsCreateDialogOpen: (isOpen: boolean) => void;
}

/**
 * Props for the WatchlistTable component
 */
export interface WatchlistTableProps {
  watchlists: Watchlist[];
  activeWatchlist: string;
  filteredItems: WatchlistItem[];
  toggleSubscription: (id: string) => void;
}

/**
 * Props for the CreateWatchlistDialog component
 */
export interface CreateWatchlistDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  watchlistName: string;
  setWatchlistName: (name: string) => void;
  handleCreate: () => void;
}

/**
 * Props for the AlertsCard component
 */
export interface AlertsCardProps {
  filteredItems: WatchlistItem[];
}
