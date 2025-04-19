
import { showError } from '@/utils/toast';

export interface ErrorResponse {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export const getErrorMessage = (error: unknown, fallbackMessage = 'An unexpected error occurred'): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return fallbackMessage;
};

export const parseError = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
      details: { stack: error.stack }
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      code: 'ERROR'
    };
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    return {
      message: getErrorMessage(errorObj.message),
      code: typeof errorObj.code === 'string' ? errorObj.code : 'UNKNOWN_ERROR',
      details: errorObj
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR'
  };
};

export const logError = (error: unknown, componentName?: string): void => {
  console.error(`Error${componentName ? ` in ${componentName}` : ''}:`, error);
  if (error instanceof Error) {
    console.error('Stack trace:', error.stack);
  }
};

export const createContextualError = (message: string, componentName: string): Error => {
  return new Error(`[${componentName}] ${message}`);
};
