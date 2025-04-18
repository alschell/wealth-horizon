
import React from "react";
import { motion } from "framer-motion";
import { headerVariants } from "./AnimationVariants";

const Header: React.FC = () => {
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Use navigate API instead of direct location change for better reliability
      window.location.href = '/';
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback if the navigation fails
      window.location.assign('/');
    }
  };

  return (
    <motion.div 
      className="bg-gray-50 border-b border-gray-200 p-4"
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="flex items-center">
        <a
          href="/"
          className="font-bold text-xl"
          onClick={handleHomeClick}
        >
          <span className="text-indigo-600">Wealth</span>
          <span className="text-gray-900">Horizon</span>
        </a>
      </div>
    </motion.div>
  );
};

export default Header;
