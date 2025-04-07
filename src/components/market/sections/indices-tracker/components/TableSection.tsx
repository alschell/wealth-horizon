
import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import IndicesTable from "./IndicesTable";
import { IndexData } from "../types";
import { AnimationItemProp } from "../types/animationTypes";

interface TableSectionProps extends AnimationItemProp {
  filteredIndices: IndexData[];
  selectedIndex: IndexData | null;
  subscribedIndices: string[];
  handleSelectIndex: (index: IndexData) => void;
  toggleSubscription: (indexName: string) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  filteredIndices,
  selectedIndex,
  subscribedIndices,
  handleSelectIndex,
  toggleSubscription,
  item
}) => {
  return (
    <motion.div variants={item as Variants}>
      <Card>
        <CardContent className="p-0">
          <IndicesTable 
            indices={filteredIndices} 
            selectedIndex={selectedIndex}
            subscribedIndices={subscribedIndices}
            handleSelectIndex={handleSelectIndex}
            toggleSubscription={toggleSubscription}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TableSection;
