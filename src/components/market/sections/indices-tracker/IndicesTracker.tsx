
import React from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import TableSection from "./components/TableSection";
import ChartsSection from "./components/ChartsSection";
import { useIndicesTracker } from "./hooks/useIndicesTracker";
import { MotionVariants } from "./types/animationTypes";

const IndicesTracker: React.FC = () => {
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
    indices
  } = useIndicesTracker();

  const container: MotionVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item: MotionVariants = {
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
      <Header 
        filter={filter} 
        setFilter={setFilter} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
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
      
      <ChartsSection 
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        subscribedIndices={subscribedIndices}
        indices={indices}
        handleSelectIndex={handleSelectIndex}
        item={item}
      />
    </motion.div>
  );
};

export default IndicesTracker;
