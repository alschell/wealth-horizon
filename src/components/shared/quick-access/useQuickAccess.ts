
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { QuickAccessItem } from "@/components/shared/quick-access/types";

export const useQuickAccess = (allItems: QuickAccessItem[]) => {
  const location = useLocation();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  
  // Get current page from pathname or default to dashboard
  const currentPage = location.pathname?.split('/')[1] || 'dashboard';
  
  useEffect(() => {
    const savedItems = localStorage.getItem(`quickAccessItems_${currentPage}`);
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      // Default to showing all items
      setVisibleItems(allItems.map(item => item.title));
    }
  }, [currentPage, allItems]);
  
  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    localStorage.setItem(`quickAccessItems_${currentPage}`, JSON.stringify(temporarySelection));
    setIsCustomizing(false);
  };

  const toggleItem = (title: string) => {
    if (temporarySelection.includes(title)) {
      setTemporarySelection(temporarySelection.filter(item => item !== title));
    } else {
      setTemporarySelection([...temporarySelection, title]);
    }
  };

  // Filter the quick links based on user selection
  const filteredItems = allItems.filter(item => 
    visibleItems.includes(item.title)
  );

  return {
    isCustomizing,
    setIsCustomizing,
    filteredItems,
    temporarySelection,
    toggleItem,
    handleCustomizeOpen,
    handleCustomizeSave
  };
};
