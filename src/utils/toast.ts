
import { toast } from 'sonner';

/**
 * Show a success toast message
 */
export const showSuccess = (title: string, message?: string) => {
  toast.success(title, {
    description: message,
    duration: 4000
  });
};

/**
 * Show an error toast message
 */
export const showError = (title: string, message?: string) => {
  toast.error(title, {
    description: message,
    duration: 5000
  });
};

/**
 * Show an information toast message
 */
export const showInfo = (title: string, message?: string) => {
  toast(title, {
    description: message,
    duration: 3000
  });
};

/**
 * Show a warning toast message
 */
export const showWarning = (title: string, message?: string) => {
  toast(title, {
    description: message,
    icon: '⚠️',
    duration: 4500
  });
};

/**
 * Show a loading toast message that can be updated
 */
export const showLoading = (title: string, message?: string) => {
  return toast.loading(title, {
    description: message
  });
};

export { toast };
