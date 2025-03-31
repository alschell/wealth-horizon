
import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdviceHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdviceHeader: React.FC<AdviceHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-bold text-black mb-4">Investment Advice</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bring your assets into scope for advice. Choose between discretionary mandates where banks manage your assets 
          or advisory mandates where you receive recommendations to execute on the platform.
        </p>
      </motion.div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mandate" className="text-sm md:text-base">
            Mandate Setup
          </TabsTrigger>
          <TabsTrigger value="assets" className="text-sm md:text-base">
            Asset Selection
          </TabsTrigger>
          <TabsTrigger value="review" className="text-sm md:text-base">
            Review & Confirm
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </header>
  );
};

export default AdviceHeader;
