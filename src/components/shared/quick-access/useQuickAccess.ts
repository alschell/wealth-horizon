
import { useState, useEffect, useCallback } from "react";
import { QuickLinkItem } from "./types";
import { allQuickLinks, defaultQuickLinks } from "./quickLinksData";

const STORAGE_KEY = "quickAccessLinks";

/**
 * Hook for managing quick access items state and customization
 * 
 * @param {string} [pathname] - Current path to determine active links
 * @returns All state and handlers for quick access functionality
 */
export const useQuickAccess = (pathname?: string) => {
  // State for the currently selected items to display
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // Filtered items based on selected IDs
  const [filteredItems, setFilteredItems] = useState<QuickLinkItem[]>([]);
  // State for the customization dialog
  const [isCustomizing, setIsCustomizing] = useState(false);
  // Temporary selection state for the dialog
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  // Error state
  const [error, setError] = useState<string | null>(null);

  /**
   * Load saved quick links from localStorage on component mount
   */
  useEffect(() => {
    try {
      const savedLinks = localStorage.getItem(STORAGE_KEY);
      
      if (savedLinks) {
        const parsedLinks = JSON.parse(savedLinks);
        
        if (Array.isArray(parsedLinks)) {
          setSelectedItems(parsedLinks);
        } else {
          // Handle invalid data format by using defaults
          setSelectedItems(defaultQuickLinks.map(item => item.id));
        }
      } else {
        // No saved links, use defaults
        setSelectedItems(defaultQuickLinks.map(item => item.id));
      }
    } catch (err) {
      console.error("Error loading quick access links:", err);
      setError("Failed to load saved quick links. Using defaults.");
      setSelectedItems(defaultQuickLinks.map(item => item.id));
    }
  }, []);

  /**
   * Update filtered items when selection changes
   */
  useEffect(() => {
    const items = allQuickLinks.filter(item => selectedItems.includes(item.id));
    setFilteredItems(items);
  }, [selectedItems]);

  /**
   * Handle opening the customize dialog
   */
  const handleCustomizeOpen = useCallback(() => {
    setTemporarySelection([...selectedItems]);
    setIsCustomizing(true);
  }, [selectedItems]);

  /**
   * Toggle an item in the temporary selection
   */
  const toggleItem = useCallback((id: string) => {
    setTemporarySelection(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      return [...prev, id];
    });
  }, []);

  /**
   * Save the current selection to localStorage and update state
   */
  const handleCustomizeSave = useCallback(() => {
    try {
      // Ensure at least one item is selected
      if (temporarySelection.length === 0) {
        setError("Please select at least one item");
        return;
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(temporarySelection));
      setSelectedItems(temporarySelection);
      setIsCustomizing(false);
      setError(null);
    } catch (err) {
      console.error("Error saving quick access links:", err);
      setError("Failed to save your customization");
    }
  }, [temporarySelection]);

  /**
   * Reset to default quick links
   */
  const resetToDefaults = useCallback(() => {
    const defaultIds = defaultQuickLinks.map(item => item.id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultIds));
      setSelectedItems(defaultIds);
      setTemporarySelection(defaultIds);
      setError(null);
    } catch (err) {
      console.error("Error resetting quick access links:", err);
      setError("Failed to reset to defaults");
    }
  }, []);

  return {
    isCustomizing,
    setIsCustomizing,
    filteredItems,
    temporarySelection,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem,
    resetToDefaults,
    error,
    clearError: () => setError(null),
  };
};
