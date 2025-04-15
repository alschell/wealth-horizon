
import { LucideIcon } from "lucide-react";

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
