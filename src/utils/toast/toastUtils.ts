
import { toast } from '@/hooks/use-toast';

/**
 * Show a success toast notification
 */
export function showSuccess(title: string, description?: string): void {
  toast({
    title,
    description,
    variant: "default",
  });
}

/**
 * Show an error toast notification
 */
export function showError(title: string, description?: string): void {
  toast({
    title,
    description: description || "Please try again",
    variant: "destructive",
  });
}

/**
 * Show an info toast notification
 */
export function showInfo(title: string, description?: string): void {
  toast({
    title,
    description,
  });
}

/**
 * Show a warning toast notification
 */
export function showWarning(title: string, description?: string): void {
  toast({
    title,
    description,
    variant: "destructive",
  });
}

// Add aliases for backward compatibility
export const showSuccessToast = showSuccess;
export const showErrorToast = showError;
export const showInfoToast = showInfo;
export const showWarningToast = showWarning;
