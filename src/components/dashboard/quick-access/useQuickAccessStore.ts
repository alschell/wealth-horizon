
import { useState, useEffect } from "react";
import { allActionItems } from "./actionItemsData";

export const useQuickAccessStore = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  
  useEffect(() => {
    const savedItems = localStorage.getItem("quickAccessVisibleItems");
    const savedOrder = localStorage.getItem("quickAccessItemOrder");
    
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      // Default to showing first 9 items
      const defaultItems = allActionItems.slice(0, 9).map(item => item.id);
      setVisibleItems(defaultItems);
    }
    
    if (savedOrder) {
      setOrderedItems(JSON.parse(savedOrder));
    } else {
      // Default order is alphabetical
      const defaultOrder = allActionItems
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(item => item.id);
      setOrderedItems(defaultOrder);
    }
  }, []);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    // Save selected items
    setVisibleItems(temporarySelection);
    localStorage.setItem("quickAccessVisibleItems", JSON.stringify(temporarySelection));
    
    // Update order to only include selected items
    const newOrder = orderedItems.filter(id => temporarySelection.includes(id));
    
    // Add any newly selected items to the end of the order
    const missingItems = temporarySelection.filter(id => !newOrder.includes(id));
    const finalOrder = [...newOrder, ...missingItems];
    
    setOrderedItems(finalOrder);
    localStorage.setItem("quickAccessItemOrder", JSON.stringify(finalOrder));
    
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
    }
  };

  const updateItemOrder = (newOrder: string[]) => {
    setOrderedItems(newOrder);
  };

  // Get filtered items based on visible selection and maintain the specified order
  const filteredItems = orderedItems
    .filter(id => visibleItems.includes(id))
    .map(id => allActionItems.find(item => item.id === id))
    .filter(Boolean);

  return {
    isCustomizing,
    setIsCustomizing,
    visibleItems,
    setVisibleItems,
    temporarySelection,
    setTemporarySelection,
    orderedItems,
    filteredItems,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem,
    updateItemOrder
  };
};
