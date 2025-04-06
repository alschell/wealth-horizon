
export interface NotificationAttachment {
  name: string;
  size: string;
}

export interface NotificationDetails {
  sender: string;
  priority?: string;
  attachments?: NotificationAttachment[];
  content: string;
  affectedAssets?: string[];
  documentId?: string;
  counterparties?: string[];
  period?: string;
  highlights?: string[];
}

export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
  link: string;
  details: NotificationDetails;
}
