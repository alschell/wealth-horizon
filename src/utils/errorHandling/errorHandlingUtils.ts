
import { ErrorHandlerOptions, ErrorResponse } from './types/core';
import { handleError } from './core';

/**
 * Wraps a function with try/catch error handling
 * @param fn The function to wrap
 * @param options Error handling options
 * @returns Function that executes the original function with error handling
 */
export function withErrorCatch<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): () => Promise<T | undefined> {
  return async (): Promise<T | undefined> => {
    try {
      return await fn();
    } catch (error) {
      handleError(error, options);
      return undefined;
    }
  };
}

/**
 * Alias for withErrorCatch for backward compatibility
 */
export const tryCatch = withErrorCatch;

/**
 * Executes a function with try/catch error handling
 * @param fn The function to execute
 * @param options Error handling options
 * @returns Result of the function or undefined if it failed
 */
export async function handleWithTry<T>(
  fn: () => Promise<T> | T,
  options: ErrorHandlerOptions = {}
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    handleError(error, options);
    return undefined;
  }
}
