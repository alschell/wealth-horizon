
import { ReactElement } from "react";

export interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  link: string;
  color?: string;
  onClick?: () => void;
}

export interface QuickAccessGridProps {
  items: QuickLinkItem[];
}

export interface QuickAccessItemProps {
  title: string;
  description: string;
  icon: ReactElement;
  link: string;
  color?: string;
  onClick?: () => void;
}

export interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
}
