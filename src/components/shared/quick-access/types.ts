
import { ReactNode } from "react";

/**
 * QuickLinkItem Interface
 * Defines the structure of a quick access link item
 * 
 * @property {string} id - Unique identifier for the item
 * @property {string} title - Display title for the item
 * @property {string} description - Short description of the item
 * @property {ReactNode} icon - Icon component to display
 * @property {string} href - Link destination
 * @property {string} [category] - Optional category for grouping items
 * @property {boolean} [isExternal] - Whether the link opens in a new tab
 * @property {string} [permission] - Optional permission required to view this item
 */
export interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  category?: string;
  isExternal?: boolean;
  permission?: string;
}

/**
 * QuickAccessState Interface
 * Defines the state structure used by the useQuickAccess hook
 * 
 * @property {string[]} selectedItems - Array of selected item IDs
 * @property {QuickLinkItem[]} filteredItems - Array of filtered items based on selection
 * @property {boolean} isCustomizing - Whether the customize dialog is open
 * @property {string[]} temporarySelection - Temporary selection state during customization
 * @property {string | null} error - Error message if any
 */
export interface QuickAccessState {
  selectedItems: string[];
  filteredItems: QuickLinkItem[];
  isCustomizing: boolean;
  temporarySelection: string[];
  error: string | null;
}

/**
 * QuickAccessHandlers Interface
 * Defines the handler functions used by the useQuickAccess hook
 * 
 * @property {Function} handleCustomizeOpen - Opens the customize dialog
 * @property {Function} handleCustomizeSave - Saves the customization
 * @property {Function} toggleItem - Toggles an item in the selection
 * @property {Function} resetToDefaults - Resets to default items
 * @property {Function} clearError - Clears any error messages
 */
export interface QuickAccessHandlers {
  handleCustomizeOpen: () => void;
  handleCustomizeSave: () => void;
  toggleItem: (id: string) => void;
  resetToDefaults: () => void;
  clearError: () => void;
}
