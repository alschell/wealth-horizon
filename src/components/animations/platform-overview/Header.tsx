
import React from "react";
import { motion } from "framer-motion";
import { headerVariants } from "./AnimationVariants";

const Header: React.FC = () => {
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
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
        >
          <span className="text-indigo-600">Wealth</span>
          <span className="text-gray-900">Horizon</span>
        </a>
      </div>
    </motion.div>
  );
};

export default Header;
