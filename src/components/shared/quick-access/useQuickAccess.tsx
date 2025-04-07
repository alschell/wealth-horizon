
import { useState, useEffect } from "react";
import { allQuickLinks } from "./quickLinksData";
import { QuickLinkItem } from "./types";

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
      // Default to showing first 8 items sorted alphabetically
      const defaultItems = allQuickLinks
        .slice(0, 8)
        .map(item => item.id);
      setVisibleItems(defaultItems);
    }
  }, [currentPage]);
  
  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = (orderedItems?: string[]) => {
    // If orderedItems are provided, use them, otherwise use temporarySelection
    const itemsToSave = orderedItems || temporarySelection;
    setVisibleItems(itemsToSave);
    localStorage.setItem(`quickAccessItems_${currentPage}`, JSON.stringify(itemsToSave));
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
    }
  };

  // Filter the quick links based on user selection and sort alphabetically
  const filteredItems: QuickLinkItem[] = visibleItems
    .map(id => allQuickLinks.find(link => link.id === id))
    .filter((item): item is QuickLinkItem => !!item)
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    isCustomizing,
    setIsCustomizing,
    visibleItems,
    temporarySelection,
    filteredItems,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem
  };
};
