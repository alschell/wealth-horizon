
import { ReactNode } from 'react';

/**
 * Dashboard section configuration
 */
export interface DashboardSection {
  /** Unique identifier for the section */
  id: string;
  
  /** Display title of the section */
  title: string;
  
  /** Optional description */
  description?: string;
  
  /** Icon component to display */
  icon?: ReactNode;
  
  /** Default visibility state */
  defaultVisible: boolean;
  
  /** Default order in the dashboard */
  defaultOrder: number;
  
  /** Whether the section is responsive to different screen sizes */
  responsive?: boolean;
  
  /** CSS classes to apply to the section container */
  className?: string;
  
  /** Whether the section is draggable in customize mode */
  draggable?: boolean;
  
  /** Minimum permission required to view the section */
  requiredPermission?: string;
}

/**
 * Dashboard layout configuration
 */
export interface DashboardLayout {
  /** Grid column configuration for different breakpoints */
  gridColumns: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  
  /** Default gap between sections */
  gridGap: number;
  
  /** Container max width */
  maxWidth?: string;
  
  /** Whether to use a sidebar layout */
  useSidebar: boolean;
  
  /** Sidebar width when used */
  sidebarWidth?: string;
}

/**
 * Dashboard customization state
 */
export interface DashboardCustomizationState {
  /** Map of section visibility states */
  dashboardSections: Record<string, boolean>;
  
  /** Order of sections */
  sectionsOrder: string[];
  
  /** Whether customization mode is active */
  isCustomizing: boolean;
}

/**
 * Dashboard item visibility and order state
 */
export interface DashboardItemsState {
  /** Array of visible section IDs in display order */
  orderedVisibleSections: string[];
}
