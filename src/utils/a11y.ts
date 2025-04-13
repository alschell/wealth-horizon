
/**
 * Utility functions for accessibility
 */

/**
 * Announce a message to screen readers
 * 
 * @param message - Message to announce
 * @param politeness - ARIA live region politeness setting
 */
export const announceToScreenReader = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
  // Create or get an existing live region element
  let liveRegion = document.getElementById(`a11y-announce-${politeness}`);
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = `a11y-announce-${politeness}`;
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
  
  // First clear the content (this is necessary for same text announcements)
  liveRegion.textContent = '';
  
  // Set the text content to trigger the announcement
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
  
  // Optionally clean up after a delay
  setTimeout(() => {
    liveRegion.textContent = '';
  }, 10000);
};

/**
 * Pause screen reader navigation on a specified element
 * 
 * @param element - Element to trap focus within
 */
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  firstElement.focus();
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
};
