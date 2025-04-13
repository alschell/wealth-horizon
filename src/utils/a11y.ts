/**
 * Accessibility utilities for the application
 * Helps improve screen reader support and keyboard navigation
 */

// Cache for announcement container
let announcementContainer: HTMLElement | null = null;

/**
 * Announces a message to screen readers
 * Creates a visually hidden live region for screen reader announcements
 * 
 * @param message - Message to announce to screen readers
 * @param politeness - ARIA live politeness setting
 */
export function announceToScreenReader(
  message: string,
  politeness: 'assertive' | 'polite' = 'polite'
): void {
  try {
    if (!announcementContainer) {
      // Create the container if it doesn't exist
      announcementContainer = document.createElement('div');
      announcementContainer.setAttribute('aria-live', politeness);
      announcementContainer.setAttribute('role', 'status');
      announcementContainer.setAttribute('aria-atomic', 'true');
      
      // Hide it visually but keep it accessible to screen readers
      Object.assign(announcementContainer.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      });
      
      document.body.appendChild(announcementContainer);
    }
    
    // Update the politeness setting if different from current
    if (announcementContainer.getAttribute('aria-live') !== politeness) {
      announcementContainer.setAttribute('aria-live', politeness);
    }
    
    // Announce the message
    announcementContainer.textContent = '';
    
    // Use setTimeout to ensure the change is registered by screen readers
    setTimeout(() => {
      if (announcementContainer) {
        announcementContainer.textContent = message;
      }
    }, 50);
  } catch (error) {
    console.error('Error announcing to screen reader:', error);
  }
}

/**
 * Ensures an element has appropriate ARIA labels
 * 
 * @param element - DOM element to enhance
 * @param label - Accessible label for the element
 * @param description - Optional description for more context
 */
export function ensureAccessibleLabels(
  element: HTMLElement,
  label: string,
  description?: string
): void {
  if (!element.getAttribute('aria-label') && !element.hasAttribute('aria-labelledby')) {
    element.setAttribute('aria-label', label);
  }
  
  if (description && !element.getAttribute('aria-describedby')) {
    const descId = `desc-${Math.random().toString(36).substring(2, 9)}`;
    const descElement = document.createElement('span');
    descElement.id = descId;
    descElement.classList.add('sr-only');
    descElement.textContent = description;
    
    element.parentNode?.appendChild(descElement);
    element.setAttribute('aria-describedby', descId);
  }
}

/**
 * Add keyboard navigation to a group of elements
 * 
 * @param containerSelector - CSS selector for the container element
 * @param itemSelector - CSS selector for the focusable items
 * @param options - Additional options
 */
export function setupKeyboardNavigation(
  containerSelector: string,
  itemSelector: string,
  options: {
    wrap?: boolean;
    orientation?: 'horizontal' | 'vertical' | 'both';
    onFocusChange?: (newElement: Element) => void;
  } = {}
): () => void {
  const { wrap = true, orientation = 'both', onFocusChange } = options;
  
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return;
    }
    
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const items = Array.from(container.querySelectorAll(itemSelector));
    if (!items.length) return;
    
    // Find the currently focused item
    const currentIndex = items.findIndex(item => item === document.activeElement);
    let nextIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowUp':
        if (orientation === 'horizontal') return;
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : (wrap ? items.length - 1 : 0);
        break;
      case 'ArrowDown':
        if (orientation === 'horizontal') return;
        event.preventDefault();
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : (wrap ? 0 : items.length - 1);
        break;
      case 'ArrowLeft':
        if (orientation === 'vertical') return;
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : (wrap ? items.length - 1 : 0);
        break;
      case 'ArrowRight':
        if (orientation === 'vertical') return;
        event.preventDefault();
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : (wrap ? 0 : items.length - 1);
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = items.length - 1;
        break;
    }
    
    if (nextIndex !== currentIndex && items[nextIndex]) {
      (items[nextIndex] as HTMLElement).focus();
      
      if (onFocusChange) {
        onFocusChange(items[nextIndex]);
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}
