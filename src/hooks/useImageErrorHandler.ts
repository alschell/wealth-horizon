
import { useCallback } from 'react';

export interface ImageErrorHandlerOptions {
  fallbackSrc?: string;
  onError?: (event: Event) => void;
  logErrors?: boolean;
}

/**
 * Hook to handle image loading errors with fallback and logging
 */
export function useImageErrorHandler({
  fallbackSrc,
  onError,
  logErrors = false
}: ImageErrorHandlerOptions = {}) {
  return useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    
    // Log error if enabled
    if (logErrors) {
      console.error('Image failed to load:', imgElement.src);
    }
    
    // Call custom error handler if provided
    if (onError) {
      onError(e.nativeEvent);
    }
    
    // Use fallback image if provided
    if (fallbackSrc && imgElement.src !== fallbackSrc) {
      imgElement.src = fallbackSrc;
    }
  }, [fallbackSrc, onError, logErrors]);
}
