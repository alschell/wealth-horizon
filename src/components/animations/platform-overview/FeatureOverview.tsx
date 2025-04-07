
import React from "react";
import { motion } from "framer-motion";
import { featureVariants } from "./AnimationVariants";

const FeatureOverview: React.FC = () => {
  return (
    <motion.div 
      className="mb-4 text-center"
      initial="initial"
      animate="animate"
      variants={featureVariants}
    >
      <h3 className="text-lg font-bold text-gray-900">Unified Wealth Management</h3>
      <p className="text-sm text-gray-500">All your assets in one place</p>
    </motion.div>
  );
};

export default FeatureOverview;
