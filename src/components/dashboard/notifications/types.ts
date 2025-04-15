
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface NotificationType {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
  iconColor?: string;
  link: string;
  details?: Record<string, any>;
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  message: string;
  time: string | Date;
  read: boolean;
  type: string;
  icon: ReactNode;
  link: string;
  details?: Record<string, any>;
}
