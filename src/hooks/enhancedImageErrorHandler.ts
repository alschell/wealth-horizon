
import { useCallback } from 'react';
import { showError } from '@/utils/toast';

export interface EnhancedImageErrorHandlerOptions {
  fallbackSrc?: string;
  onError?: (event: Event, src: string) => void;
  logErrors?: boolean;
  showToast?: boolean;
  toastMessage?: string;
  retryCount?: number;
}

/**
 * Enhanced hook to handle image loading errors with fallback, logging, and retry options
 */
export function enhancedImageErrorHandler({
  fallbackSrc,
  onError,
  logErrors = false,
  showToast = false,
  toastMessage = 'Failed to load image',
  retryCount = 0
}: EnhancedImageErrorHandlerOptions = {}) {
  return useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const imgElement = e.currentTarget;
    const originalSrc = imgElement.getAttribute('data-original-src') || imgElement.src;
    
    // Track retry attempts
    const currentRetryAttempt = Number(imgElement.getAttribute('data-retry-attempt') || '0');
    
    // Log error if enabled
    if (logErrors) {
      console.error('Image failed to load:', originalSrc, `(Attempt ${currentRetryAttempt + 1})`);
    }
    
    // Call custom error handler if provided
    if (onError) {
      onError(e.nativeEvent, originalSrc);
    }
    
    // Show toast notification if enabled
    if (showToast) {
      showError('Image Error', toastMessage);
    }
    
    // Try to retry loading the image if attempts left
    if (currentRetryAttempt < retryCount) {
      imgElement.setAttribute('data-retry-attempt', String(currentRetryAttempt + 1));
      
      // Add cache busting parameter
      const hasParams = originalSrc.includes('?');
      const cacheBustSrc = `${originalSrc}${hasParams ? '&' : '?'}cb=${Date.now()}`;
      
      setTimeout(() => {
        imgElement.src = cacheBustSrc;
      }, 1000); // Delay retry to avoid rapid requests
      
      return;
    }
    
    // Use fallback image if provided and not already using it
    if (fallbackSrc && imgElement.src !== fallbackSrc) {
      // Store original src for potential future reference
      if (!imgElement.getAttribute('data-original-src')) {
        imgElement.setAttribute('data-original-src', originalSrc);
      }
      
      imgElement.src = fallbackSrc;
    }
  }, [fallbackSrc, onError, logErrors, showToast, toastMessage, retryCount]);
}
