
import { toast } from "@/components/ui/use-toast";

/**
 * Toast utility functions for consistent notifications
 */

/**
 * Display success toast
 * 
 * @param title - Toast title
 * @param description - Toast description
 */
export const showSuccessToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "default"
  });
};

/**
 * Display error toast
 * 
 * @param title - Toast title
 * @param description - Toast description
 */
export const showErrorToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "destructive"
  });
};

/**
 * Display warning toast
 * 
 * @param title - Toast title
 * @param description - Toast description
 */
export const showWarningToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "destructive", // Change from "warning" to "destructive" to match the allowed variants
    className: "bg-amber-50 border-amber-200 text-amber-800" // Add className to style it as a warning
  });
};

/**
 * Display info toast
 * 
 * @param title - Toast title
 * @param description - Toast description
 */
export const showInfoToast = (title: string, description: string) => {
  toast({
    title,
    description,
    variant: "default"
  });
};

/**
 * Display a toast notification for action results
 * 
 * @param success - Whether action was successful
 * @param successTitle - Success toast title
 * @param successMessage - Success toast message
 * @param errorTitle - Error toast title
 * @param errorMessage - Error toast message
 */
export const showActionResultToast = (
  success: boolean,
  successTitle: string,
  successMessage: string,
  errorTitle: string = "Error",
  errorMessage: string = "An error occurred. Please try again."
) => {
  if (success) {
    showSuccessToast(successTitle, successMessage);
  } else {
    showErrorToast(errorTitle, errorMessage);
  }
};

export default {
  success: showSuccessToast,
  error: showErrorToast,
  warning: showWarningToast,
  info: showInfoToast,
  actionResult: showActionResultToast
};
