
export interface Notification {
  id: number;
  title: string;
  message: string;
  description: string; // Add description property
  time: string | Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  icon?: React.ReactNode; // Add icon property
  link?: string;
  action?: string;
  entity?: {
    id: string;
    type: string;
    name: string;
  };
  details?: Record<string, any>; // For additional details
}
