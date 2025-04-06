
import { LucideIcon } from "lucide-react";

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color?: string;
}

export interface QuickLinkItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color?: string;
}

export interface QuickAccessGridProps {
  items?: QuickAccessItem[];
  links?: QuickLinkItem[];
  title?: string;
  showCustomizeButton?: boolean;
}

export interface QuickAccessItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
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
