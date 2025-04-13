
import React, { useState } from 'react';
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
}

/**
 * Image component with fallback and loading states
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
  ...props
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleImageError = useImageErrorHandler({
    fallbackImage: fallbackSrc
  });
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  };
  
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "transition-opacity duration-300",
        isLoaded ? "opacity-100" : "opacity-0",
        className
      )}
      loading={priority ? "eager" : "lazy"}
      onLoad={handleLoad}
      onError={handleImageError}
      {...props}
    />
  );
};

export default Image;
