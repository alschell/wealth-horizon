
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FilterButtons from "./components/FilterButtons";
import SearchAndFilter from "./components/SearchAndFilter";
import IndicesTable from "./components/IndicesTable";
import IndexPerformanceChart from "./components/IndexPerformanceChart";
import SubscriptionsCard from "./components/SubscriptionsCard";
import { useIndicesTracker } from "./hooks/useIndicesTracker";

const IndicesTracker = () => {
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
      <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-bold">Global Indices</h2>
            <Badge variant="outline" className="text-xs">Live</Badge>
          </div>
          <FilterButtons filter={filter} setFilter={setFilter} />
        </div>
        <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </motion.div>
      
      <motion.div variants={item}>
        <Card>
          <CardContent className="p-0">
            <IndicesTable 
              indices={filteredIndices} 
              selectedIndex={selectedIndex}
              subscribedIndices={subscribedIndices}
              handleSelectIndex={handleSelectIndex}
              toggleSubscription={toggleSubscription}
            />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IndexPerformanceChart 
          selectedIndex={selectedIndex} 
          setSelectedIndex={setSelectedIndex}
          indices={indices}
        />
        
        <SubscriptionsCard 
          subscribedIndices={subscribedIndices}
          indices={indices}
          handleSelectIndex={handleSelectIndex}
        />
      </motion.div>
    </motion.div>
  );
};

export default IndicesTracker;
