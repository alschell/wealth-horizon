
/**
 * Toast utility functions for displaying notifications
 */

import { toast as shadcnToast } from '@/components/ui/use-toast';

/**
 * Show a success toast notification
 * @param title - The title of the toast
 * @param message - The message to display
 * @param duration - How long to show the toast (ms)
 */
export function showSuccess(title: string, message: string, duration = 3000) {
  shadcnToast({
    title,
    description: message,
    variant: 'default',
    duration
  });
}

/**
 * Show an error toast notification
 * @param title - The title of the toast
 * @param message - The error message to display
 * @param duration - How long to show the toast (ms)
 */
export function showError(title: string, message: string, duration = 5000) {
  shadcnToast({
    title,
    description: message,
    variant: 'destructive',
    duration
  });
}

/**
 * Show an info toast notification
 * @param title - The title of the toast
 * @param message - The message to display
 * @param duration - How long to show the toast (ms)
 */
export function showInfo(title: string, message: string, duration = 3000) {
  shadcnToast({
    title,
    description: message,
    variant: 'default',
    duration
  });
}

/**
 * Show a warning toast notification
 * @param title - The title of the toast
 * @param message - The warning message to display
 * @param duration - How long to show the toast (ms)
 */
export function showWarning(title: string, message: string, duration = 4000) {
  shadcnToast({
    title,
    description: message,
    variant: 'default',
    className: 'bg-amber-100 text-amber-900 border-amber-300',
    duration
  });
}

/**
 * Export the original toast function for advanced usage
 */
export const toast = shadcnToast;
