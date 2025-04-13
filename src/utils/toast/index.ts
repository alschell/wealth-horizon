
/**
 * Toast utility functions for consistent notifications
 */
import { 
  showSuccess as success,
  showError as error,
  showWarning as warning,
  showInfo as info,
  showActionResult as actionResult
} from './toastUtils';

// Re-export the toast utility functions
export const showSuccessToast = success;
export const showErrorToast = error;
export const showWarningToast = warning;
export const showInfoToast = info;
export const showActionResultToast = actionResult;

/**
 * Display a confirmation toast - useful for successful actions
 * 
 * @param message - Toast message
 */
export const showConfirmation = (message: string) => success('Success', message);

/**
 * Display a simple error toast - useful for catching exceptions
 * 
 * @param err - Error object or message
 */
export const showException = (err: unknown) => {
  const message = err instanceof Error 
    ? err.message 
    : 'An unexpected error occurred';
  
  error('Error', message);
};

// Default export for object-style usage
export default {
  success,
  error,
  warning,
  info,
  actionResult,
  showConfirmation,
  showException
};
