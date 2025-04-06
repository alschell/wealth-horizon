
import { ReactElement } from "react";

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: ReactElement;
  link: string;
  color?: string;
  onClick?: () => void;
}

export interface QuickAccessGridProps {
  items: QuickAccessItem[];
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
  items: QuickAccessItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: () => void;
}
