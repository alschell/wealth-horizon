
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategoryTabsProps {
  category: string;
  setCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ category, setCategory }) => {
  return (
    <Tabs defaultValue="all" value={category} onValueChange={setCategory}>
      <TabsList>
        <TabsTrigger value="all">All News</TabsTrigger>
        <TabsTrigger value="markets">Markets</TabsTrigger>
        <TabsTrigger value="stocks">Stocks</TabsTrigger>
        <TabsTrigger value="commodities">Commodities</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default CategoryTabs;
