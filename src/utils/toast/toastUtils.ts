
import { toast } from "@/hooks/use-toast";

/**
 * Show a success toast notification
 */
export function showSuccess(title: string, description?: string, duration = 3000) {
  toast({
    title,
    description,
    variant: "default",
    duration
  });
}

/**
 * Show an error toast notification
 */
export function showError(title: string, description?: string, duration = 5000) {
  toast({
    title,
    description: description || "An error occurred. Please try again.",
    variant: "destructive",
    duration
  });
}

/**
 * Show an info toast notification
 */
export function showInfo(title: string, description?: string, duration = 3000) {
  toast({
    title,
    description,
    duration
  });
}

/**
 * Show a warning toast notification
 */
export function showWarning(title: string, description?: string, duration = 4000) {
  toast({
    title,
    description,
    variant: "destructive",
    duration
  });
}
