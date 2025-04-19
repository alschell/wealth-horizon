
/**
 * Toast utility functions for success and error notifications
 */
import { toast } from "sonner";

/**
 * Display a success toast notification
 */
export function showSuccess(title: string, message: string) {
  toast.success(title, {
    description: message,
    duration: 3000,
  });
}

/**
 * Display an error toast notification
 */
export function showError(title: string, message: string) {
  toast.error(title, {
    description: message,
    duration: 5000,
  });
}

/**
 * Display an info toast notification
 */
export function showInfo(title: string, message: string) {
  toast.info(title, {
    description: message,
    duration: 3000,
  });
}

/**
 * Display a warning toast notification
 */
export function showWarning(title: string, message: string) {
  toast.warning(title, {
    description: message,
    duration: 4000,
  });
}
