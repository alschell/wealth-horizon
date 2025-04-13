
/**
 * Announces a message to screen readers using an ARIA live region
 * @param message - The message to announce
 * @param priority - The priority level of the announcement (polite or assertive)
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return;
  
  // Look for existing announcement element or create a new one
  let announcer = document.getElementById('screen-reader-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
  
  // Set the priority level
  announcer.setAttribute('aria-live', priority);
  
  // Announce the message by updating the content
  // We briefly clear it first to ensure announcement even if the text hasn't changed
  announcer.textContent = '';
  
  // Use setTimeout to ensure the clearing has time to process
  setTimeout(() => {
    announcer.textContent = message;
  }, 50);
}

/**
 * Creates a unique ID for use in ARIA attributes
 * @param prefix - Optional prefix for the ID
 * @returns A unique string ID
 */
export function generateAriaId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Focuses an element and announces it to screen readers
 * @param elementId - ID of the element to focus
 * @param announcement - Optional message to announce
 */
export function focusElement(elementId: string, announcement?: string): void {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return;
  
  const element = document.getElementById(elementId);
  
  if (element) {
    element.focus();
    
    if (announcement) {
      announceToScreenReader(announcement);
    }
  }
}

/**
 * Creates a trap focus within a container
 * @param containerId - ID of the container element
 * @returns Object with methods to activate and deactivate the focus trap
 */
export function createFocusTrap(containerId: string) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return {
      activate: () => {},
      deactivate: () => {},
    };
  }
  
  let active = false;
  let previousActiveElement: Element | null = null;
  
  // Function to get all focusable elements in the container
  const getFocusableElements = (): HTMLElement[] => {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const focusableSelectors = [
      'a[href]:not([disabled])',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    
    const elements = container.querySelectorAll(focusableSelectors.join(','));
    return Array.from(elements) as HTMLElement[];
  };
  
  // Event handler for tab key
  const handleTabKey = (event: KeyboardEvent) => {
    if (!active) return;
    
    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // If shift+tab on first element, move to last element
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    // If tab on last element, move to first element
    else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };
  
  // Event handler for escape key
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (!active) return;
    
    if (event.key === 'Escape') {
      deactivate();
    }
  };
  
  // Function to activate the focus trap
  const activate = () => {
    if (active) return;
    
    previousActiveElement = document.activeElement;
    active = true;
    
    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Focus the first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  };
  
  // Function to deactivate the focus trap
  const deactivate = () => {
    if (!active) return;
    
    active = false;
    
    document.removeEventListener('keydown', handleTabKey);
    document.removeEventListener('keydown', handleEscapeKey);
    
    // Restore focus to the previously active element
    if (previousActiveElement && 'focus' in previousActiveElement) {
      (previousActiveElement as HTMLElement).focus();
    }
  };
  
  return {
    activate,
    deactivate,
  };
}

/**
 * Enhances an element with ARIA keyboard navigation
 * @param elementId - ID of the element to enhance
 * @param options - Options for keyboard navigation
 */
export function enhanceWithKeyboardNavigation(
  elementId: string,
  options: {
    arrowKeys?: boolean;
    homeEnd?: boolean;
    onSelection?: (element: HTMLElement) => void;
  } = {}
) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return () => {};
  
  const { arrowKeys = true, homeEnd = true, onSelection } = options;
  
  // Event handler for keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Get all focusable items
    const items = Array.from(
      element.querySelectorAll('[role="menuitem"], [role="option"], [role="tab"], [role="listitem"]')
    ) as HTMLElement[];
    
    if (items.length === 0) return;
    
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    let nextIndex = -1;
    
    // Handle different key presses
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (arrowKeys) {
          event.preventDefault();
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        }
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        if (arrowKeys) {
          event.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }
        break;
      case 'Home':
        if (homeEnd) {
          event.preventDefault();
          nextIndex = 0;
        }
        break;
      case 'End':
        if (homeEnd) {
          event.preventDefault();
          nextIndex = items.length - 1;
        }
        break;
      case 'Enter':
      case ' ':
        if (onSelection && currentIndex >= 0) {
          event.preventDefault();
          onSelection(items[currentIndex]);
        }
        break;
    }
    
    // Focus the next item if needed
    if (nextIndex >= 0) {
      items[nextIndex].focus();
    }
  };
  
  // Add event listener
  document.getElementById(elementId)?.addEventListener('keydown', handleKeyDown);
  
  // Return a cleanup function
  return () => {
    document.getElementById(elementId)?.removeEventListener('keydown', handleKeyDown);
  };
}
