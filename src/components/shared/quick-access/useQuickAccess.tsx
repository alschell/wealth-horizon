
import { useState, useEffect } from "react";
import { allQuickLinks } from "./quickLinksData";

export const useQuickAccess = (pathname?: string) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  
  // Get current page from pathname or default to dashboard
  const currentPage = pathname?.split('/')[1] || 'dashboard';
  
  useEffect(() => {
    const savedItems = localStorage.getItem(`quickAccessItems_${currentPage}`);
    if (savedItems) {
      setVisibleItems(JSON.parse(savedItems));
    } else {
      // Default to showing all items
      setVisibleItems(allQuickLinks.map(item => item.title));
    }
  }, [currentPage]);
  
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
  const filteredLinks = allQuickLinks.filter(link => 
    visibleItems.includes(link.title)
  );

  return {
    isCustomizing,
    setIsCustomizing,
    visibleItems,
    temporarySelection,
    filteredLinks,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem
  };
};
