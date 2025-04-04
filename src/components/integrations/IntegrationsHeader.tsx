
import React from "react";
import { motion } from "framer-motion";
import { Puzzle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";

const IntegrationsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-black">Third-Party Integrations</h1>
        <p className="text-gray-500 mt-1">
          Connect your family office with external service providers and tools to enhance your wealth management capabilities
        </p>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search integrations..." 
            className="pl-10 bg-white" 
          />
        </div>
        <Button variant="outline" className="border-gray-200">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default IntegrationsHeader;
