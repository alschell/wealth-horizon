
/**
 * Toast utility implementation with consistent styling and behavior
 */
import { toast } from "sonner";

// Toast duration defaults
const DEFAULT_DURATION = 5000;
const ERROR_DURATION = 7000;

// Toast types with consistent styling and behavior
export const showSuccess = (title: string, message: string, duration = DEFAULT_DURATION) => {
  toast.success(title, {
    description: message,
    duration,
  });
};

export const showError = (title: string, message: string, duration = ERROR_DURATION) => {
  toast.error(title, {
    description: message,
    duration,
  });
};

export const showWarning = (title: string, message: string, duration = DEFAULT_DURATION) => {
  toast.warning(title, {
    description: message,
    duration,
  });
};

export const showInfo = (title: string, message: string, duration = DEFAULT_DURATION) => {
  toast.info(title, {
    description: message,
    duration,
  });
};

export const showActionResult = (
  success: boolean,
  successMessage: string,
  errorMessage: string
) => {
  if (success) {
    showSuccess('Success', successMessage);
  } else {
    showError('Error', errorMessage);
  }
};
