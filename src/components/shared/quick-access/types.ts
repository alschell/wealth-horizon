
import { ReactNode } from "react";

/**
 * Quick link item type
 */
export interface QuickLinkItem {
  id: string;
  title: string;
  href: string;
  icon: ReactNode;
  description?: string;
  category?: string;
}

/**
 * Props for QuickAccessItem component
 */
export interface QuickAccessItemProps {
  title: string;
  description?: string;
  icon: ReactNode;
  link: string;
  color?: string;
  onClick?: () => void;
}

/**
 * Props for QuickAccessGrid component
 */
export interface QuickAccessGridProps {
  items: QuickLinkItem[];
}

/**
 * Props for CustomizeDialog component
 */
export interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
}
