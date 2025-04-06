
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LoadMoreButton: React.FC = () => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="flex justify-center"
    >
      <Button>Load More News</Button>
    </motion.div>
  );
};

export default LoadMoreButton;
