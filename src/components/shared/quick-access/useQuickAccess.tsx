
import { useState, useEffect, useCallback, useMemo } from "react";
import { allQuickLinks } from "./quickLinksData";
import { QuickLinkItem } from "./types";

/**
 * useQuickAccess Hook
 * 
 * Custom hook for managing the state and logic of the Quick Access component
 * 
 * @param {string} pathname - Current path from router
 * @returns {Object} Quick access state and handlers
 */
export const useQuickAccess = (pathname?: string) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  
  // Get current page from pathname or default to dashboard
  const currentPage = useMemo(() => pathname?.split('/')[1] || 'dashboard', [pathname]);
  
  // Load saved items from localStorage
  useEffect(() => {
    try {
      const storageKey = `quickAccessItems_${currentPage}`;
      const savedItems = localStorage.getItem(storageKey);
      
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          setVisibleItems(parsedItems);
        } else {
          console.warn('Invalid quick access items format in localStorage');
          setDefaultItems();
        }
      } else {
        setDefaultItems();
      }
    } catch (error) {
      console.error('Error loading quick access items:', error);
      setDefaultItems();
    }
  }, [currentPage]);
  
  // Set default items (first 8 items)
  const setDefaultItems = useCallback(() => {
    const defaultItems = allQuickLinks
      .slice(0, 8)
      .map(item => item.id);
    setVisibleItems(defaultItems);
  }, []);

  // Open customize dialog
  const handleCustomizeOpen = useCallback(() => {
    setTemporarySelection([...visibleItems]);
    setIsCustomizing(true);
  }, [visibleItems]);

  // Save customized selection
  const handleCustomizeSave = useCallback((orderedItems?: string[]) => {
    try {
      // If orderedItems are provided, use them, otherwise use temporarySelection
      const itemsToSave = orderedItems || temporarySelection;
      setVisibleItems(itemsToSave);
      localStorage.setItem(`quickAccessItems_${currentPage}`, JSON.stringify(itemsToSave));
      setIsCustomizing(false);
    } catch (error) {
      console.error('Error saving quick access items:', error);
      // Show error notification to user (would implement with toast library)
    }
  }, [temporarySelection, currentPage]);

  // Toggle item selection
  const toggleItem = useCallback((id: string) => {
    setTemporarySelection(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  // Filter and sort the quick links based on user selection
  const filteredItems = useMemo(() => {
    const items = visibleItems
      .map(id => allQuickLinks.find(link => link.id === id))
      .filter((item): item is QuickLinkItem => !!item)
      .sort((a, b) => a.title.localeCompare(b.title));
      
    return items;
  }, [visibleItems]);

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
