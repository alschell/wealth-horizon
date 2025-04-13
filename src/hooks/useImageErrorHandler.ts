
import { useCallback } from 'react';

interface ImageErrorHandlerOptions {
  fallbackSrc?: string;
  onError?: (error: Event) => void;
  altText?: string;
}

/**
 * A hook that returns a handler for image loading errors
 * 
 * @param options - Configuration options
 * @returns A callback function to handle image errors
 */
export const useImageErrorHandler = (options: ImageErrorHandlerOptions = {}) => {
  const {
    fallbackSrc = '/assets/dashboard-fallback.png',
    onError,
    altText = 'Image'
  } = options;

  const handleImageError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    
    // Log the error
    console.warn(`Failed to load image${img.alt ? ` (${img.alt})` : ''}: ${img.src}`);
    
    // Set the fallback image
    img.src = fallbackSrc;
    
    // If no alt text is set, add a descriptive one
    if (!img.alt) {
      img.alt = altText;
    }
    
    // Call the custom error handler if provided
    if (onError) {
      onError(event.nativeEvent);
    }
  }, [fallbackSrc, onError, altText]);

  return handleImageError;
};
