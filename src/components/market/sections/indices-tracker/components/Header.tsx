
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import FilterButtons from "./FilterButtons";
import SearchAndFilter from "./SearchAndFilter";
import { AnimationItemProp } from "../types/animationTypes";

interface HeaderProps extends AnimationItemProp {
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  filter, 
  setFilter, 
  searchTerm, 
  setSearchTerm,
  item 
}) => {
  return (
    <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold">Global Indices</h2>
          <Badge variant="outline" className="text-xs">Live</Badge>
        </div>
        <FilterButtons filter={filter} setFilter={setFilter} />
      </div>
      <SearchAndFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </motion.div>
  );
};

export default Header;
