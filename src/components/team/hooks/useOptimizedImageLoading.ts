
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseOptimizedImageLoadingOptions {
  /** Whether to load the image immediately or lazily */
  lazy?: boolean;
  /** Priority level for the image loading (1-5, 1 being highest) */
  priority?: 1 | 2 | 3 | 4 | 5;
  /** Callback to run when the image loads successfully */
  onSuccess?: () => void;
  /** Callback to run when the image fails to load */
  onError?: (error?: Error) => void;
}

interface UseOptimizedImageLoadingResult {
  /** Whether the image is currently loading */
  isLoading: boolean;
  /** Whether the image has errored during loading */
  hasError: boolean;
  /** Function to manually trigger image load */
  loadImage: () => void;
  /** Error details, if any */
  errorDetails?: Error;
  /** Props to spread onto an img element */
  imageProps: {
    onLoad: () => void;
    onError: () => void;
    loading: 'lazy' | 'eager';
    className: string;
  };
}

/**
 * Custom hook for optimized image loading with performance enhancements
 * Provides loading states, error handling, and lazy loading capabilities
 * 
 * @param src - Image source URL
 * @param alt - Alt text for the image
 * @param options - Configuration options
 * @returns Loading states and image props
 */
export function useOptimizedImageLoading(
  src: string,
  alt: string,
  options: UseOptimizedImageLoadingOptions = {}
): UseOptimizedImageLoadingResult {
  const { lazy = true, priority = 3, onSuccess, onError } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorDetails, setErrorDetails] = useState<Error | undefined>(undefined);
  const { toast } = useToast();
  
  // Generate CSS classes based on priority
  const priorityClasses = useCallback(() => {
    const baseClasses = "w-full h-full object-cover transition-opacity duration-300";
    
    // Add priority-specific classes
    return `${baseClasses} ${isLoading ? 'opacity-0' : 'opacity-100'} priority-${priority}`;
  }, [isLoading, priority]);
  
  // Handle successful image load
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    setErrorDetails(undefined);
    
    if (onSuccess) {
      onSuccess();
    }
    
    // Performance tracking for high priority images
    if (priority <= 2) {
      console.debug(`High priority image loaded: ${src}`);
      performance.mark(`image-loaded-${src.substring(0, 20)}`);
    }
  }, [src, priority, onSuccess]);
  
  // Handle image loading error
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    
    // Create detailed error
    const error = new Error(`Failed to load image: ${src}`);
    error.name = 'ImageLoadError';
    setErrorDetails(error);
    
    // Log error details
    console.error(`Failed to load image: ${src}`);
    
    if (onError) {
      onError(error);
    }
    
    // Show toast for high priority images only
    if (priority <= 2) {
      toast({
        title: "Image failed to load",
        description: `Unable to load an image resource. Using fallback.`,
        variant: "destructive",
      });
    }
  }, [src, priority, onError, toast]);
  
  // Function to manually trigger image loading
  const loadImage = useCallback(() => {
    // Reset states
    setIsLoading(true);
    setHasError(false);
    setErrorDetails(undefined);
    
    // Create image object
    const img = new Image();
    img.src = src;
    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Add performance marks for high priority images
    if (priority <= 2) {
      performance.mark(`image-start-${src.substring(0, 20)}`);
    }
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, handleLoad, handleError, priority]);
  
  // Effect to load image on mount or when src changes
  useEffect(() => {
    return loadImage();
  }, [src, loadImage]);
  
  return {
    isLoading,
    hasError,
    loadImage,
    errorDetails,
    imageProps: {
      onLoad: handleLoad,
      onError: handleError,
      loading: lazy ? 'lazy' : 'eager',
      className: priorityClasses(),
    }
  };
}
