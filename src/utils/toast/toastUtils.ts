
import { toast } from '@/hooks/use-toast';

export type ToastVariant = "default" | "destructive" | "success" | "warning" | "info";

interface ToastOptions {
  duration?: number;
  actionLabel?: string;
  actionFn?: () => void;
  onDismiss?: () => void;
}

/**
 * Centralized toast notification function with consistent interface
 */
export function showToast(
  title: string, 
  description?: string, 
  variant: ToastVariant = "default",
  options: ToastOptions = {}
): void {
  const { duration, actionLabel, actionFn, onDismiss } = options;
  
  toast({
    title,
    description,
    variant: variant === "success" ? "default" : variant === "info" ? "default" : variant,
    duration,
    // Include action if provided
    ...(actionLabel && actionFn ? {
      action: (
        <button onClick={actionFn} className="px-3 py-1 rounded bg-primary text-primary-foreground text-xs">
          {actionLabel}
        </button>
      )
    } : {})
  });
  
  // Call onDismiss if provided
  if (onDismiss) {
    setTimeout(onDismiss, (duration || 5000) + 300);
  }
}

/**
 * Show a success toast notification
 */
export function showSuccess(title: string, description?: string, options?: ToastOptions): void {
  showToast(title, description, "success", options);
}

/**
 * Show an error toast notification
 */
export function showError(title: string, description?: string, options?: ToastOptions): void {
  showToast(title, description, "destructive", options);
}

/**
 * Show an info toast notification
 */
export function showInfo(title: string, description?: string, options?: ToastOptions): void {
  showToast(title, description, "info", options);
}

/**
 * Show a warning toast notification
 */
export function showWarning(title: string, description?: string, options?: ToastOptions): void {
  showToast(title, description, "warning", options);
}

// Add aliases for backward compatibility
export const showSuccessToast = showSuccess;
export const showErrorToast = showError;
export const showInfoToast = showInfo;
export const showWarningToast = showWarning;
