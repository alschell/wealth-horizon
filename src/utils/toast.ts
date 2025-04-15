
// Toast utility functions
import { toast as toastFunction } from "@/hooks/use-toast";

/**
 * Shows a success toast notification
 */
export const showSuccess = (title: string, description?: string) => {
  toastFunction({
    title,
    description,
    variant: "default",
  });
};

/**
 * Shows an error toast notification
 */
export const showError = (title: string, description?: string) => {
  toastFunction({
    title,
    description: description || "An error occurred",
    variant: "destructive",
  });
};

/**
 * Shows an info toast notification
 */
export const showInfo = (title: string, description?: string) => {
  toastFunction({
    title,
    description,
  });
};

/**
 * Shows a warning toast notification
 */
export const showWarning = (title: string, description?: string) => {
  toastFunction({
    title,
    description,
    variant: "destructive",
  });
};
