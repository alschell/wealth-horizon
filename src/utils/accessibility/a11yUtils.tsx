
/**
 * Accessibility utilities to enhance component accessibility
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

/**
 * Types of announcements for screen readers
 */
type AnnouncementType = 'assertive' | 'polite';

/**
 * Options for screen reader announcements
 */
interface AnnounceOptions {
  type?: AnnouncementType;
  clearAfter?: number; // milliseconds
}

/**
 * Announces a message to screen readers
 * 
 * @param message Message to announce
 * @param options Configuration options
 */
export function announce(message: string, options: AnnounceOptions = {}) {
  const { type = 'polite', clearAfter = 5000 } = options;
  
  // Create or find the live region
  let liveRegion = document.getElementById(`sr-live-region-${type}`);
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `sr-live-region-${type}`;
    liveRegion.setAttribute('aria-live', type);
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-relevant', 'additions');
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.padding = '0';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    liveRegion.style.border = '0';
    document.body.appendChild(liveRegion);
  }
  
  // Set the message
  liveRegion.textContent = message;
  
  // Clear after the specified time
  if (clearAfter) {
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = '';
      }
    }, clearAfter);
  }
}

/**
 * Hook for making screen reader announcements within components
 * 
 * @returns Function to announce messages
 */
export function useAnnounce() {
  return useCallback((message: string, options?: AnnounceOptions) => {
    announce(message, options);
  }, []);
}

/**
 * Creates a "Skip to content" link that's only visible when focused
 * 
 * @returns React component for skip link
 */
export function SkipToContent() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
      // Reset tabIndex after transition
      setTimeout(() => {
        mainContent.removeAttribute('tabindex');
      }, 1000);
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground"
    >
      Skip to content
    </a>
  );
}

/**
 * Hook to trap focus within a container
 * 
 * @param active Whether the focus trap is active
 * @returns Ref to attach to the container element
 */
export function useFocusTrap(active: boolean = true) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus the first element when the trap activates
    firstElement.focus();
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab - backwards navigation
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } 
      // Tab - forward navigation
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);
  
  return containerRef;
}

/**
 * Component to make modals accessible
 */
export function AccessibleModal({
  children,
  isOpen,
  onClose,
  title,
  description
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
}) {
  const containerRef = useFocusTrap(isOpen);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  
  // Store previously focused element
  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);
  
  // Restore focus when modal closes
  useEffect(() => {
    if (!isOpen && prevFocusRef.current) {
      prevFocusRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 id="modal-title" className="text-xl font-semibold">{title}</h2>
        {description && (
          <p id="modal-description" className="mt-2 text-muted-foreground">
            {description}
          </p>
        )}
        <div className="mt-4">
          {children}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

/**
 * Hook to detect when page announcement should be made for screen readers
 * 
 * @param title Page title to announce
 */
export function usePageAnnouncement(title: string) {
  const { toast } = useToast();
  const announcementMade = useRef(false);
  
  useEffect(() => {
    if (announcementMade.current) return;
    
    // Update document title
    const originalTitle = document.title;
    document.title = title;
    
    // Announce page change
    announce(`Navigated to ${title}`, { type: 'assertive' });
    announcementMade.current = true;
    
    // Show toast notification only in development
    if (process.env.NODE_ENV === 'development') {
      toast({
        title: "Screen Reader Announcement",
        description: `"${title}" was announced to screen readers`,
        variant: "default"
      });
    }
    
    return () => {
      document.title = originalTitle;
    };
  }, [title, toast]);
}

/**
 * Hook to detect and announce dynamic content changes
 * 
 * @param content Content to watch for changes
 * @param label Label describing the content
 */
export function useContentChangeAnnouncement(content: any, label: string) {
  const previousContent = useRef(content);
  
  useEffect(() => {
    if (JSON.stringify(previousContent.current) !== JSON.stringify(content)) {
      announce(`${label} updated`, { type: 'polite' });
      previousContent.current = content;
    }
  }, [content, label]);
}
