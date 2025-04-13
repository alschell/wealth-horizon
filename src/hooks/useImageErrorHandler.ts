
import { useCallback } from "react";

interface ImageErrorHandlerOptions {
  fallbackImage?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Hook that returns a function to handle image loading errors
 * by setting a fallback image source
 * 
 * @param options - Configuration options for the error handler
 * @returns A memoized callback function to handle image errors
 */
export const useImageErrorHandler = (options: ImageErrorHandlerOptions = {}) => {
  const { 
    fallbackImage = '/assets/dashboard-fallback.png',
    onError 
  } = options;

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
    
    // Call optional onError handler if provided
    if (onError) {
      onError(e);
    }
  }, [fallbackImage, onError]);

  return handleImageError;
};
