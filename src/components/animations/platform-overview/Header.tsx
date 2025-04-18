
import React from "react";
import { motion } from "framer-motion";
import { headerVariants } from "./AnimationVariants";

const Header: React.FC = () => {
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  return (
    <motion.div 
      className="bg-gray-50 border-b border-gray-200 p-4"
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="flex items-center">
        <button onClick={handleHomeClick} className="font-bold text-xl focus:outline-none">
          <span className="text-indigo-600">Wealth</span>
          <span className="text-gray-900">Horizon</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Header;
