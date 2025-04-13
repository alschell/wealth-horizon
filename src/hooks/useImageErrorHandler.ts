
import { useCallback } from 'react';

interface UseImageErrorHandlerOptions {
  fallbackImage?: string;
  onError?: (error: Event) => void;
  logErrors?: boolean;
}

/**
 * Custom hook for handling image loading errors
 * Provides consistent fallback behavior and error logging
 */
export function useImageErrorHandler({
  fallbackImage = '/assets/dashboard-fallback.png',
  onError,
  logErrors = true
}: UseImageErrorHandlerOptions = {}) {
  
  const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    const originalSrc = target.src;
    
    // Log error for debugging
    if (logErrors) {
      console.warn(`Image failed to load: ${originalSrc}`);
    }
    
    // Set fallback image if provided
    if (fallbackImage && originalSrc !== fallbackImage) {
      target.src = fallbackImage;
    }
    
    // Call custom error handler if provided
    if (onError) {
      onError(event.nativeEvent);
    }
  }, [fallbackImage, onError, logErrors]);
  
  return handleImageError;
}
