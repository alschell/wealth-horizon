
import { ReactNode } from 'react';

/**
 * Type of notification
 */
export type NotificationType = 'info' | 'warning' | 'success' | 'error';

/**
 * Entity referenced by a notification
 */
export interface NotificationEntity {
  id: string;
  type: string;
  name: string;
}

/**
 * Notification object structure
 */
export interface Notification {
  /** Unique identifier for the notification */
  id: number;
  
  /** Short notification title */
  title: string;
  
  /** Main notification message */
  message: string;
  
  /** Optional detailed description */
  description: string;
  
  /** Timestamp of the notification */
  time: string | Date;
  
  /** Whether the notification has been read */
  read: boolean;
  
  /** Type of notification (affects styling) */
  type: NotificationType;
  
  /** Optional custom icon */
  icon?: ReactNode;
  
  /** Optional link to navigate to on click */
  link?: string;
  
  /** Optional action text */
  action?: string;
  
  /** Optional related entity */
  entity?: NotificationEntity;
  
  /** Optional additional structured details */
  details?: Record<string, any>;
}

/**
 * Props for notification filtering
 */
export interface NotificationFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

/**
 * Props for notification settings
 */
export interface NotificationSettingsProps {
  settings: NotificationSettings;
  onSettingsChange: (settings: NotificationSettings) => void;
}

/**
 * User notification preferences
 */
export interface NotificationSettings {
  enableEmail: boolean;
  enablePush: boolean;
  enableInApp: boolean;
  mutedCategories: string[];
  digestFrequency: 'immediate' | 'daily' | 'weekly';
}
