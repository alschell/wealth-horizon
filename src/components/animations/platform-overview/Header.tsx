
import React from "react";
import { motion } from "framer-motion";
import { headerVariants } from "./AnimationVariants";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <motion.div 
      className="bg-gray-50 border-b border-gray-200 p-4"
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="flex items-center">
        <Link to="/" className="font-bold text-xl">
          <span className="text-indigo-600">Wealth</span>
          <span className="text-gray-900">Horizon</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default Header;
