
import { ReactNode } from "react";

export interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
}

export interface QuickAccessItemProps extends QuickLinkItem {
  color?: string;
  onClick?: () => void;
}

export interface QuickAccessGridProps {
  items: QuickLinkItem[];
}

export interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: (orderedItems?: string[]) => void;
}
