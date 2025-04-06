
import React from "react";

export interface QuickLinkItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color?: string;
}
