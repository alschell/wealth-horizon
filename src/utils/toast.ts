
import { toast } from '@/hooks/use-toast';

/**
 * Show a success toast notification
 */
export function showSuccess(title: string, message?: string) {
  toast({
    title,
    description: message,
    variant: 'default'
  });
}

/**
 * Show an error toast notification
 */
export function showError(title: string, message?: string) {
  toast({
    title,
    description: message,
    variant: 'destructive'
  });
}

/**
 * Show an info toast notification
 */
export function showInfo(title: string, message?: string) {
  toast({
    title,
    description: message
  });
}

/**
 * Show a warning toast notification
 */
export function showWarning(title: string, message?: string) {
  toast({
    title,
    description: message,
    variant: 'destructive',
    className: 'bg-amber-500'
  });
}
