
/**
 * Accessibility utilities for improving application accessibility
 */

// This is the most commonly used function to announce messages to screen readers
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
  if (!message) return;

  try {
    // Try to find an existing live region with the specified priority
    let liveRegion = document.querySelector(`[aria-live="${priority}"]`) as HTMLElement;

    // If no live region exists, create one
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', priority);
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('class', 'sr-only');
      document.body.appendChild(liveRegion);
    }

    // Set the content of the live region to announce it
    liveRegion.textContent = '';
    
    // This timeout is necessary to ensure the announcement is made
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 50);
  } catch (error) {
    console.error('Failed to announce message to screen reader:', error);
  }
};

// Focus management utilities
export const setFocusToElement = (element: HTMLElement | null): void => {
  if (!element) return;

  try {
    element.focus();
  } catch (error) {
    console.error('Failed to set focus to element:', error);
  }
};

// Set focus to first focusable element in a container
export const setFocusToFirstElement = (container: HTMLElement | null): void => {
  if (!container) return;

  try {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  } catch (error) {
    console.error('Failed to set focus to first element:', error);
  }
};

// Get all focusable elements in a container
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  try {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    const elements = Array.from(container.querySelectorAll(selectors.join(',')));
    return elements.filter(el => {
      // Filter out hidden elements
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }) as HTMLElement[];
  } catch (error) {
    console.error('Failed to get focusable elements:', error);
    return [];
  }
};

// Trap focus within a container (for modals, dialogs, etc.)
export const trapFocus = (container: HTMLElement): (() => void) => {
  if (!container) return () => {};

  try {
    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) return () => {};

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Save previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Set initial focus
    firstElement.focus();

    // Handle tab navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      // Shift + Tab
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      // Tab
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && 'focus' in previouslyFocused) {
        previouslyFocused.focus();
      }
    };
  } catch (error) {
    console.error('Failed to trap focus:', error);
    return () => {};
  }
};

// Enhanced keyboard event handling
export const handleEnterKeyPress = (event: React.KeyboardEvent, callback: () => void): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

// Skip to main content link functionality
export const setupSkipToMainContent = (): void => {
  try {
    const skipLink = document.querySelector('[data-skip-to-content]') as HTMLAnchorElement;
    if (!skipLink) return;

    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      const mainContent = document.querySelector('main, [role="main"]') as HTMLElement;
      if (mainContent) {
        mainContent.tabIndex = -1;
        mainContent.focus();
        // Reset tabindex after focus
        setTimeout(() => {
          mainContent.removeAttribute('tabindex');
        }, 100);
      }
    });
  } catch (error) {
    console.error('Failed to set up skip to main content:', error);
  }
};

// Check if high contrast mode is enabled
export const isHighContrastMode = (): boolean => {
  try {
    // This is a heuristic and might not be 100% accurate
    const testElement = document.createElement('div');
    testElement.style.border = '1px solid transparent';
    testElement.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")';
    document.body.appendChild(testElement);
    
    const computedStyle = window.getComputedStyle(testElement);
    const backgroundImage = computedStyle.backgroundImage;
    
    document.body.removeChild(testElement);
    
    // In high contrast mode, background images are typically not displayed
    return backgroundImage === 'none';
  } catch (error) {
    console.error('Failed to detect high contrast mode:', error);
    return false;
  }
};

// Generate unique IDs for accessibility attributes
export const generateAccessibleId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};
