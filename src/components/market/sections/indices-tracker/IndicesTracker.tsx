
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useIndicesTracker } from "./hooks/useIndicesTracker";
import SearchAndFilter from "./components/SearchAndFilter";
import TableSection from "./components/TableSection";
import ChartsSection from "./components/ChartsSection";
import { IndicesTrackerProps } from './types';

const IndicesTracker: React.FC<IndicesTrackerProps> = ({ indices: externalIndices }) => {
  // Use external indices if provided, otherwise rely on the hook's default implementation
  const {
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    subscribedIndices,
    selectedIndex,
    setSelectedIndex,
    filteredIndices,
    toggleSubscription,
    handleSelectIndex,
    indices: hookIndices,
    isLoading
  } = useIndicesTracker(externalIndices);

  // Use either the provided indices or the ones from the hook
  const indices = externalIndices || hookIndices;

  // Define animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      <SearchAndFilter 
        filter={filter} 
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        item={item}
      />
      
      <ChartsSection 
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        subscribedIndices={subscribedIndices}
        indices={indices}
        handleSelectIndex={handleSelectIndex}
        item={item}
      />
      
      <TableSection 
        filteredIndices={filteredIndices}
        selectedIndex={selectedIndex}
        subscribedIndices={subscribedIndices}
        handleSelectIndex={handleSelectIndex}
        toggleSubscription={toggleSubscription}
        item={item}
      />
    </motion.div>
  );
};

export default IndicesTracker;
