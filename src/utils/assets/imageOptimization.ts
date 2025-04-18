
/**
 * Utilities for optimizing image loading and display
 */

import { useState, useEffect } from 'react';

interface ImageDimensions {
  width: number;
  height: number;
}

interface ResponsiveImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Hook to check if an image has loaded
 * 
 * @param src Image source URL
 * @returns Object containing loading state and error state
 */
export function useImageLoading(src?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setHasError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return { isLoading, hasError };
}

/**
 * Hook to get image dimensions
 * 
 * @param src Image source URL
 * @returns Object containing width and height, or null if not loaded
 */
export function useImageDimensions(src?: string): ImageDimensions | null {
  const [dimensions, setDimensions] = useState<ImageDimensions | null>(null);
  
  useEffect(() => {
    if (!src) {
      return;
    }
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    
    return () => {
      img.onload = null;
    };
  }, [src]);
  
  return dimensions;
}

/**
 * Calculate the appropriate srcSet for responsive images
 * 
 * @param src Base image URL
 * @param widths Array of widths to generate srcSet for
 * @returns Formatted srcSet string
 */
export function generateSrcSet(src: string, widths: number[]): string {
  if (!src) return '';
  
  // Check if the src is already using a CDN that supports image resizing
  if (src.includes('?w=') || src.includes('&w=')) {
    return '';
  }
  
  // Determine base URL and extension
  const lastDotIndex = src.lastIndexOf('.');
  if (lastDotIndex === -1) return src;
  
  const baseUrl = src.substring(0, lastDotIndex);
  const extension = src.substring(lastDotIndex);
  
  // Generate srcSet with various sizes
  return widths
    .map(width => `${baseUrl}-${width}w${extension} ${width}w`)
    .join(', ');
}

/**
 * Constants for common image width breakpoints
 */
export const COMMON_IMAGE_WIDTHS = [320, 640, 768, 1024, 1280, 1536, 1920];

/**
 * Generate blur placeholder for images
 * This is a placeholder function - in a real implementation, 
 * this would generate or fetch a tiny placeholder image
 */
export function getBlurPlaceholder(src: string): string {
  // In a real implementation, this would generate a tiny placeholder
  // For now, return a transparent pixel
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
}
