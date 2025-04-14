
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "@/utils/icons";
import { actionVariants } from "./AnimationVariants";

const ActionButton: React.FC = () => {
  return (
    <motion.div 
      className="mt-6 flex justify-center"
      initial="initial"
      animate="animate"
      variants={actionVariants}
    >
      <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center text-sm">
        Get Started <ArrowRight size={16} className="ml-2" />
      </div>
    </motion.div>
  );
};

export default ActionButton;
