
import { ReactNode } from "react";

export interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}
