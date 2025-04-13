
import { useCallback } from "react";

interface ImageErrorHandlerOptions {
  fallbackImage?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  logErrors?: boolean;
}

/**
 * Hook that returns a function to handle image loading errors
 * by setting a fallback image source
 * 
 * @param options - Configuration options for the error handler
 * @returns A memoized callback function to handle image errors
 * 
 * @example
 * ```tsx
 * const handleImageError = useImageErrorHandler({
 *   fallbackImage: '/assets/fallback.png'
 * });
 * 
 * return <img src={imageUrl} onError={handleImageError} alt="Description" />;
 * ```
 */
export const useImageErrorHandler = (options: ImageErrorHandlerOptions = {}) => {
  const { 
    fallbackImage = '/assets/dashboard-fallback.png',
    onError,
    logErrors = process.env.NODE_ENV === 'development'
  } = options;

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const originalSrc = e.currentTarget.src;
    
    // Only set fallback if current src isn't already the fallback
    if (originalSrc !== fallbackImage) {
      e.currentTarget.src = fallbackImage;
      
      // Log errors in development mode if enabled
      if (logErrors) {
        console.warn(`Image failed to load: ${originalSrc}, using fallback: ${fallbackImage}`);
      }
    }
    
    // Call optional onError handler if provided
    if (onError) {
      onError(e);
    }
  }, [fallbackImage, onError, logErrors]);

  return handleImageError;
};
