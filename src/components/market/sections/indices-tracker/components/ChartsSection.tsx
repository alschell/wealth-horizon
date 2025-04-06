
import React from "react";
import { motion } from "framer-motion";
import IndexPerformanceChart from "./IndexPerformanceChart";
import SubscriptionsCard from "./SubscriptionsCard";
import { IndexData } from "../types";
import { AnimationItemProp } from "../types/animationTypes";

interface ChartsSectionProps extends AnimationItemProp {
  selectedIndex: IndexData | null;
  setSelectedIndex: (index: IndexData | null) => void;
  subscribedIndices: string[];
  indices: IndexData[];
  handleSelectIndex: (index: IndexData) => void;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  selectedIndex,
  setSelectedIndex,
  subscribedIndices,
  indices,
  handleSelectIndex,
  item
}) => {
  return (
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
  );
};

export default ChartsSection;
