
import { toast } from 'sonner';

export interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  action?: {
    label: string;
    onClick: () => void;
  };
  closeButton?: boolean;
  dismissible?: boolean;
  unstyled?: boolean;
}

/**
 * Show a success toast notification
 */
export function showSuccess(
  title: string, 
  message?: string, 
  options?: ToastOptions
) {
  return toast.success(title, {
    description: message,
    duration: options?.duration ?? 5000,
    position: options?.position ?? 'top-right',
    action: options?.action,
    closeButton: options?.closeButton,
    dismissible: options?.dismissible ?? true,
    unstyled: options?.unstyled
  });
}

/**
 * Show an error toast notification
 */
export function showError(
  title: string, 
  message?: string, 
  options?: ToastOptions
) {
  return toast.error(title, {
    description: message,
    duration: options?.duration ?? 5000,
    position: options?.position ?? 'top-right',
    action: options?.action,
    closeButton: options?.closeButton,
    dismissible: options?.dismissible ?? true,
    unstyled: options?.unstyled
  });
}

/**
 * Show a warning toast notification
 */
export function showWarning(
  title: string, 
  message?: string, 
  options?: ToastOptions
) {
  return toast.warning(title, {
    description: message,
    duration: options?.duration ?? 5000,
    position: options?.position ?? 'top-right',
    action: options?.action,
    closeButton: options?.closeButton,
    dismissible: options?.dismissible ?? true,
    unstyled: options?.unstyled
  });
}

/**
 * Show an info toast notification
 */
export function showInfo(
  title: string, 
  message?: string, 
  options?: ToastOptions
) {
  return toast.info(title, {
    description: message,
    duration: options?.duration ?? 5000,
    position: options?.position ?? 'top-right',
    action: options?.action,
    closeButton: options?.closeButton,
    dismissible: options?.dismissible ?? true,
    unstyled: options?.unstyled
  });
}

/**
 * Show a toast with custom style
 */
export function showCustom(
  title: string,
  message?: string,
  className?: string,
  options?: ToastOptions
) {
  return toast(title, {
    description: message,
    duration: options?.duration ?? 5000,
    position: options?.position ?? 'top-right',
    action: options?.action,
    closeButton: options?.closeButton,
    dismissible: options?.dismissible ?? true,
    unstyled: options?.unstyled,
    className
  });
}

/**
 * Show a toast notification for an action result
 */
export function showActionResult(
  success: boolean,
  successTitle: string,
  successMessage?: string,
  errorTitle?: string,
  errorMessage?: string,
  options?: ToastOptions
) {
  if (success) {
    return showSuccess(successTitle, successMessage, options);
  } else {
    return showError(
      errorTitle ?? 'Error', 
      errorMessage ?? 'An error occurred', 
      options
    );
  }
}

/**
 * Show a promise toast that updates based on promise resolution
 */
export function showPromise<T>(
  promise: Promise<T>,
  {
    loading = 'Loading...',
    success = 'Success!',
    error = 'Error!',
    finally: onFinally,
    id,
    position,
    className,
  }: {
    loading?: string;
    success?: string | ((data: T) => string);
    error?: string | ((error: any) => string);
    finally?: () => void;
    id?: string;
    position?: ToastOptions['position'];
    className?: string;
  } = {}
) {
  return toast.promise(promise, {
    loading,
    success: (data) => (typeof success === 'function' ? success(data) : success),
    error: (err) => (typeof error === 'function' ? error(err) : error),
    finally: onFinally,
    id,
    position,
    className,
  });
}
