
import { ReactNode } from "react";

export interface NotificationType {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: ReactNode;
  link: string;
  details?: Record<string, any>;
}
