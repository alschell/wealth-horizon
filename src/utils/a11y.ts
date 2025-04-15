
// Accessibility utility functions

/**
 * Announces a message to screen readers
 * Creates a visually hidden element that is announced by screen readers,
 * then removes the element after the announcement is made
 */
export const announceToScreenReader = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') return;
  
  // Create an aria-live region
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', politeness);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('role', politeness === 'assertive' ? 'alert' : 'status');
  
  // Make it visually hidden but still accessible to screen readers
  announcement.style.position = 'absolute';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.padding = '0';
  announcement.style.margin = '-1px';
  announcement.style.overflow = 'hidden';
  announcement.style.clip = 'rect(0, 0, 0, 0)';
  announcement.style.whiteSpace = 'nowrap';
  announcement.style.border = '0';
  
  // Add to the DOM
  document.body.appendChild(announcement);
  
  // Set the text content after a brief delay to ensure it's announced
  window.setTimeout(() => {
    announcement.textContent = message;
    
    // Remove the element after announcement (generally after 3 seconds)
    window.setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 3000);
  }, 50);
};
