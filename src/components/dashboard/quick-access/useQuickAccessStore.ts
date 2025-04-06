
import { useState, useEffect } from "react";
import { allActionItems } from "./actionItemsData";

export const useQuickAccessStore = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  
  useEffect(() => {
    const savedItems = localStorage.getItem("quickAccessVisibleItems");
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      // Default to showing first 9 items
      setVisibleItems(allActionItems.slice(0, 9).map(item => item.id));
    }
  }, []);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    localStorage.setItem("quickAccessVisibleItems", JSON.stringify(temporarySelection));
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
    }
  };

  // Get filtered items based on visible selection
  const filteredItems = allActionItems.filter(item => 
    visibleItems.includes(item.id)
  );

  return {
    isCustomizing,
    setIsCustomizing,
    visibleItems,
    setVisibleItems,
    temporarySelection,
    setTemporarySelection,
    filteredItems,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem
  };
};
