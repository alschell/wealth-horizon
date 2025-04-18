
/**
 * Utility functions for displaying toast notifications
 */

import { toast } from "sonner";

/**
 * Display a success toast notification
 * 
 * @param title - The title of the toast notification
 * @param message - The message to display
 */
export const showSuccess = (title: string, message: string) => {
  toast.success(title, {
    description: message,
    duration: 5000,
  });
};

/**
 * Display an error toast notification
 * 
 * @param title - The title of the toast notification
 * @param message - The message to display
 */
export const showError = (title: string, message: string) => {
  toast.error(title, {
    description: message,
    duration: 5000,
  });
};

/**
 * Display an info toast notification
 * 
 * @param title - The title of the toast notification
 * @param message - The message to display
 */
export const showInfo = (title: string, message: string) => {
  toast.info(title, {
    description: message,
    duration: 5000,
  });
};

/**
 * Display a warning toast notification
 * 
 * @param title - The title of the toast notification
 * @param message - The message to display
 */
export const showWarning = (title: string, message: string) => {
  toast.warning(title, {
    description: message,
    duration: 5000,
  });
};
