
import { ReactNode } from "react";

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: string;
  onClick?: () => void;
}

export interface QuickAccessGridProps {
  items?: QuickAccessItem[];
  title?: string;
  showCustomizeButton?: boolean;
}

export interface QuickAccessItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: string;
  onClick?: () => void;
}

export interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickAccessItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
}
