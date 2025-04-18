
import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IndicesTable from "./IndicesTable";
import { IndexData } from "../types";
import { AnimationItemProp } from "../types/animationTypes";

interface TableSectionProps extends AnimationItemProp {
  filteredIndices: IndexData[];
  selectedIndex: IndexData;
  subscribedIndices: string[];
  handleSelectIndex: (index: IndexData) => void;
  toggleSubscription: (id: string) => void;
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
        <CardHeader className="pb-2">
          <CardTitle>Global Indices</CardTitle>
        </CardHeader>
        <CardContent>
          <IndicesTable
            indices={filteredIndices}
            selectedIndex={selectedIndex}
            isLoading={false}
            onOpenChart={handleSelectIndex}
            item={item}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TableSection;
