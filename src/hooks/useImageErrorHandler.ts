
import { useCallback } from "react";

interface ImageErrorHandlerOptions {
  fallbackImage?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  logErrors?: boolean;
  retryCount?: number;
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
    logErrors = process.env.NODE_ENV === 'development',
    retryCount = 0
  } = options;

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.currentTarget;
    const originalSrc = imgElement.src;
    
    // Get retry attempt from data attribute or default to 0
    const currentRetry = parseInt(imgElement.dataset.retryAttempt || '0', 10);
    
    // Only set fallback if we've exceeded retry count and current src isn't already the fallback
    if (currentRetry >= retryCount && originalSrc !== fallbackImage) {
      imgElement.src = fallbackImage;
      
      // Log errors in development mode if enabled
      if (logErrors) {
        console.warn(`Image failed to load: ${originalSrc}, using fallback: ${fallbackImage}`);
      }
    } else if (currentRetry < retryCount) {
      // Increment retry attempt
      imgElement.dataset.retryAttempt = (currentRetry + 1).toString();
      
      // Wait a moment and retry the original source
      setTimeout(() => {
        if (logErrors) {
          console.info(`Retrying image load (${currentRetry + 1}/${retryCount}): ${originalSrc}`);
        }
        imgElement.src = originalSrc;
      }, 1000); // 1 second delay before retry
    }
    
    // Call optional onError handler if provided
    if (onError) {
      onError(e);
    }
  }, [fallbackImage, onError, logErrors, retryCount]);

  return handleImageError;
};
