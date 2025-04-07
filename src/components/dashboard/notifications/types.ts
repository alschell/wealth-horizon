
export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string | Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  link?: string;
  action?: string;
  entity?: {
    id: string;
    type: string;
    name: string;
  };
}
