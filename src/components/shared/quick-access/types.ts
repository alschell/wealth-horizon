
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
