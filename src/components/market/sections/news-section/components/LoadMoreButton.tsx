
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center pt-4"
    >
      <Button 
        variant="outline" 
        onClick={onClick}
        className="min-w-[200px]"
      >
        Load More News
      </Button>
    </motion.div>
  );
};

export default LoadMoreButton;
