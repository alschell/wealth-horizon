
import { ReactNode } from "react";

export interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
}

export interface CustomizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: QuickLinkItem[];
  selectedItems: string[];
  onItemToggle: (id: string) => void;
  onSave: (orderedItems?: string[]) => void;
}
