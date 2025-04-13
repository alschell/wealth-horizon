
import React, { useState, useCallback } from 'react';
import { cn } from "@/lib/utils";
import { useImageErrorHandler } from '@/hooks/useImageErrorHandler';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
  priority?: boolean;
  onLoadingComplete?: () => void;
  onError?: (error: Event) => void;
}

/**
 * Image component with fallback and loading states
 * Includes accessibility improvements and error handling
 */
export const Image = ({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = '/assets/dashboard-fallback.png',
  priority = false,
  onLoadingComplete,
  onError,
  ...props
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const handleImageError = useImageErrorHandler({
    fallbackImage: fallbackSrc,
    onError,
    logErrors: true
  });
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  }, [onLoadingComplete]);
  
  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    handleImageError(e);
  }, [handleImageError]);
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        hasError ? "opacity-80" : "",
        className
      )}
      loading={priority ? "eager" : "lazy"}
      onLoad={handleLoad}
      onError={handleError}
      aria-errormessage={hasError ? "Image failed to load properly" : undefined}
      {...props}
    />
  );
};

export default Image;
