
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
  title?: string;
  showCustomizeButton?: boolean;
  links?: QuickLinkItem[];
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
  onItemToggle: (title: string) => void;
  onSave: () => void;
}
