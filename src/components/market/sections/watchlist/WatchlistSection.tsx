
import React from "react";
import { motion } from "framer-motion";
import { useWatchlist } from "./hooks/useWatchlist";
import WatchlistHeader from "./components/WatchlistHeader";
import WatchlistSidebar from "./components/WatchlistSidebar";
import WatchlistTable from "./components/WatchlistTable";
import PerformanceChartCard from "./components/PerformanceChartCard";
import AlertsCard from "./components/AlertsCard";
import CreateWatchlistDialog from "./components/CreateWatchlistDialog";

/**
 * WatchlistSection component for managing and displaying watchlists
 * Shows watchlist data in a table format with performance charts and alerts
 * 
 * @returns Complete watchlist management interface
 */
const WatchlistSection = () => {
  const {
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
  } = useWatchlist();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <WatchlistHeader 
        item={item}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <WatchlistSidebar 
          watchlists={watchlists}
          activeWatchlist={activeWatchlist}
          setActiveWatchlist={setActiveWatchlist}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />
        
        <WatchlistTable 
          watchlists={watchlists}
          activeWatchlist={activeWatchlist}
          filteredItems={filteredItems}
          toggleSubscription={toggleSubscription}
        />
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceChartCard />
        <AlertsCard filteredItems={filteredItems} />
      </motion.div>

      <CreateWatchlistDialog 
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
        watchlistName={newWatchlistName}
        setWatchlistName={setNewWatchlistName}
        handleCreate={handleCreateWatchlist}
      />
    </motion.div>
  );
};

export default WatchlistSection;
