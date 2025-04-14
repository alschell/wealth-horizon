
/**
 * Quick Access Module
 * 
 * This module exports components and utilities for the Quick Access feature,
 * which provides customizable quick links to frequently used application areas.
 */

import QuickAccess from "./QuickAccess";
import QuickAccessGrid from "./QuickAccessGrid";
import QuickAccessItem from "./QuickAccessItem";
import CustomizeDialog from "./CustomizeDialog";
import { useQuickAccess } from "./useQuickAccess";
import { allQuickLinks, defaultQuickLinks } from "./quickLinksData";
import type { QuickLinkItem, QuickAccessState, QuickAccessHandlers } from "./types";

export {
  QuickAccess,
  QuickAccessGrid,
  QuickAccessItem,
  CustomizeDialog,
  useQuickAccess,
  allQuickLinks,
  defaultQuickLinks,
};

// Type exports
export type {
  QuickLinkItem,
  QuickAccessState,
  QuickAccessHandlers,
};
