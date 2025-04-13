
import { useCallback } from "react";

/**
 * Hook that returns a function to handle image loading errors
 * by setting a fallback image source
 */
export const useImageErrorHandler = (fallbackImage: string = '/assets/dashboard-fallback.png') => {
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = fallbackImage;
  }, [fallbackImage]);

  return handleImageError;
};
