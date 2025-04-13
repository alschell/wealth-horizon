
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

// Default export for object-style usage
export default {
  success,
  error,
  warning,
  info,
  actionResult
};
