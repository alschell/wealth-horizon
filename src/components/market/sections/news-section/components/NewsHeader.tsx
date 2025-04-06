
import React from "react";
import { motion } from "framer-motion";
import CategoryTabs from "./CategoryTabs";
import SearchBar from "./SearchBar";

interface NewsHeaderProps {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({ 
  category, 
  setCategory,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Financial News</h2>
        <CategoryTabs category={category} setCategory={setCategory} />
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </motion.div>
  );
};

export default NewsHeader;
