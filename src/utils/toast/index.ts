
/**
 * Centralized export point for toast notifications
 * This file unifies all toast-related functionality to provide a consistent API
 */

// Re-export from the centralized toast module
export {
  toast,
  useToast,
  type Toast
} from '@/hooks/use-toast';

// Re-export all utility toast functions from utility files
export {
  showToast,
  showSuccess,
  showError,
  showInfo,
  showWarning,
  // Add these aliases for backward compatibility
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
  type ToastVariant
} from './toastUtils';

export {
  showDocumentationToast,
  showCopySuccessToast,
  showDownloadToast
} from './documentationToasts';

// Export the Toaster component and types
export * from '@/components/ui/sonner';
