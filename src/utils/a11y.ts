
/**
 * Announces a message to screen readers
 * @param message The message to announce
 * @param politeness The politeness level ('polite' or 'assertive')
 */
export const announceToScreenReader = (message: string, politeness: 'polite' | 'assertive' = 'assertive') => {
  const announce = document.createElement('div');
  announce.setAttribute('aria-live', politeness);
  announce.setAttribute('aria-atomic', 'true');
  announce.setAttribute('class', 'sr-only');
  document.body.appendChild(announce);
  
  // Timeout needed to ensure the DOM change is announced
  setTimeout(() => {
    announce.textContent = message;
    
    // Remove the element after it's been announced
    setTimeout(() => {
      document.body.removeChild(announce);
    }, 1000);
  }, 100);
};

/**
 * Adds a non-visual focus indicator for keyboard navigation
 * @param element The element to add focus styles to
 */
export const addFocusRing = (element: HTMLElement) => {
  element.classList.add('focus-visible:ring-2', 'focus-visible:ring-offset-2', 'focus-visible:ring-primary', 'focus-visible:outline-none');
};

/**
 * Manages focus trap for modal dialogs
 * @param containerRef Reference to the container element
 * @param isActive Whether the focus trap is active
 */
export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>, isActive: boolean) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !isActive || !containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // If shift+tab and on first element, move to last element
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } 
    // If tab and on last element, move to first element
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };
  
  if (isActive) {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }
  
  return undefined;
};
