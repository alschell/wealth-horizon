
/**
 * Accessibility utilities to enhance app accessibility
 */

// Announce messages to screen readers
export const announceToScreenReader = (message: string, politeness: 'polite' | 'assertive' = 'polite'): void => {
  // Create or get the live region element
  let announcer = document.getElementById('screen-reader-announcer');
  
  if (!announcer) {
    announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', politeness);
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  } else {
    // Update politeness if needed
    announcer.setAttribute('aria-live', politeness);
  }
  
  // Set the message
  announcer.textContent = message;
  
  // Clear the announcer after a delay
  setTimeout(() => {
    if (announcer) announcer.textContent = '';
  }, 3000);
};

// Add keyboard support to interactive elements
export const makeKeyboardAccessible = (element: HTMLElement): void => {
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
  }
  
  if (!element.hasAttribute('role')) {
    // Try to determine appropriate role
    if (element.tagName === 'DIV' || element.tagName === 'SPAN') {
      element.setAttribute('role', 'button');
    }
  }
  
  // Add keyboard listener if it doesn't have one
  if (!element.hasAttribute('data-keyboard-accessible')) {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        element.click();
      }
    });
    element.setAttribute('data-keyboard-accessible', 'true');
  }
};

// Focus management for modals and dialogs
export const trapFocus = (container: HTMLElement): () => void => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Focus the first element
  firstElement.focus();
  
  // Handle tab navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
};

// Create a skip link for keyboard users
export const createSkipLink = (): void => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:p-2 focus:bg-white focus:z-50';
  skipLink.textContent = 'Skip to main content';
  
  // Insert at the beginning of the body
  document.body.insertBefore(skipLink, document.body.firstChild);
};
