
import React from "react";
import { motion } from "framer-motion";
import { Search, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WealthAnalysisHeader = () => {
  return (
    <header className="w-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Wealth Analysis</h1>
          <p className="text-gray-500 mt-1">
            Advanced analytics, simulations, and benchmarking for your portfolio
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search assets, metrics..." 
              className="pl-10 bg-white" 
            />
          </div>
          <Button variant="outline" className="border-gray-200">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </Button>
          <Button variant="outline" className="border-gray-200">
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
          </Button>
        </div>
      </motion.div>
    </header>
  );
};

export default WealthAnalysisHeader;
