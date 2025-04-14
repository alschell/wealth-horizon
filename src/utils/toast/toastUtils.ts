
/**
 * Toast utility functions for common toast notifications
 */

import { toast } from '@/hooks/use-toast';

export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Show a generic toast notification
 */
export const showToast = (
  title: string, 
  message?: string, 
  variant: ToastVariant = 'default'
) => {
  // Map our custom variants to the available toast variants
  const toastVariant = variant === 'success' || variant === 'info' 
    ? 'default' 
    : variant === 'warning' 
      ? 'destructive' 
      : variant;
      
  toast({
    title,
    description: message,
    variant: toastVariant
  });
};

/**
 * Show a success toast notification
 */
export const showSuccess = (title: string, message?: string) => {
  toast({
    title,
    description: message,
    variant: 'default'
  });
};

/**
 * Show an error toast notification
 */
export const showError = (title: string, message?: string) => {
  toast({
    title,
    description: message,
    variant: 'destructive'
  });
};

/**
 * Show an info toast notification
 */
export const showInfo = (title: string, message?: string) => {
  toast({
    title,
    description: message,
    variant: 'default'
  });
};

/**
 * Show a warning toast notification
 */
export const showWarning = (title: string, message?: string) => {
  toast({
    title,
    description: message,
    variant: 'destructive'
  });
};

// Aliases for backward compatibility
export const showSuccessToast = showSuccess;
export const showErrorToast = showError;
export const showInfoToast = showInfo;
export const showWarningToast = showWarning;
