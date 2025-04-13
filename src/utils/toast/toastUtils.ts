
import { toast } from "@/components/ui/use-toast";

/**
 * Display a success toast message
 * 
 * @param title - Toast title
 * @param message - Toast message
 */
export const showSuccess = (title: string, message: string) => {
  toast({
    title,
    description: message,
    variant: "default"
  });
};

/**
 * Display an error toast message
 * 
 * @param title - Toast title
 * @param message - Toast message
 */
export const showError = (title: string, message: string) => {
  toast({
    title,
    description: message,
    variant: "destructive"
  });
};

/**
 * Display a warning toast message
 * 
 * @param title - Toast title
 * @param message - Toast message
 */
export const showWarning = (title: string, message: string) => {
  toast({
    title,
    description: message,
    variant: "destructive",
    className: "bg-amber-50 border-amber-200 text-amber-800"
  });
};

/**
 * Display an info toast message
 * 
 * @param title - Toast title
 * @param message - Toast message
 */
export const showInfo = (title: string, message: string) => {
  toast({
    title,
    description: message,
    variant: "default"
  });
};

/**
 * Display a toast notification for action results
 * 
 * @param success - Whether action was successful
 * @param successTitle - Success toast title
 * @param successMessage - Success toast message
 * @param errorTitle - Error toast title (optional)
 * @param errorMessage - Error toast message (optional)
 */
export const showActionResult = (
  success: boolean,
  successTitle: string,
  successMessage: string,
  errorTitle = "Error",
  errorMessage = "An error occurred. Please try again."
) => {
  if (success) {
    showSuccess(successTitle, successMessage);
  } else {
    showError(errorTitle, errorMessage);
  }
};
