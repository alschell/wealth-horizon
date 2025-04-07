import React from "react";
import { motion } from "framer-motion";
import { featureVariants } from "./AnimationVariants";

const FeatureOverview: React.FC = () => {
  return (
    <motion.div 
      className="mb-4"
      initial="initial"
      animate="animate"
      variants={featureVariants}
    >
    </motion.div>
  );
};

export default FeatureOverview;
