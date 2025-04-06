
import { ReactNode } from "react";

export interface QuickLinkItem {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  color?: string;
}
