/**
 * Utility functions for accessibility improvements
 */

/**
 * Announces a message to screen readers
 * @param message The message to announce
 * @param politeness The politeness level (polite or assertive)
 */
export function announceToScreenReader(
  message: string, 
  politeness: 'polite' | 'assertive' = 'polite'
): void {
  if (typeof document === 'undefined') return;
  
  // Create or get the announcement element
  let announcementElement = document.getElementById('screen-reader-announcement');
  
  if (!announcementElement) {
    announcementElement = document.createElement('div');
    announcementElement.id = 'screen-reader-announcement';
    announcementElement.setAttribute('aria-live', politeness);
    announcementElement.setAttribute('aria-atomic', 'true');
    announcementElement.style.position = 'absolute';
    announcementElement.style.width = '1px';
    announcementElement.style.height = '1px';
    announcementElement.style.padding = '0';
    announcementElement.style.margin = '-1px';
    announcementElement.style.overflow = 'hidden';
    announcementElement.style.clip = 'rect(0, 0, 0, 0)';
    announcementElement.style.whiteSpace = 'nowrap';
    announcementElement.style.border = '0';
    
    document.body.appendChild(announcementElement);
  }
  
  // Set the politeness level (in case it changed)
  announcementElement.setAttribute('aria-live', politeness);
  
  // Announce the message
  announcementElement.textContent = message;
}

/**
 * Checks if a component is being navigated with a keyboard
 */
export function isKeyboardNavigation(event: React.KeyboardEvent): boolean {
  return event.key === 'Tab' || 
         event.key === 'ArrowUp' || 
         event.key === 'ArrowDown' || 
         event.key === 'ArrowLeft' || 
         event.key === 'ArrowRight';
}

/**
 * Generates aria-label for image fallbacks
 */
export function getImageFallbackAriaLabel(name: string): string {
  return `Profile image for ${name} couldn't be loaded`;
}

/**
 * Helper for focus management within a component
 */
export function trapFocus(
  containerRef: React.RefObject<HTMLElement>,
  callback?: () => void
): () => void {
  if (!containerRef.current) return () => {};
  
  const focusableElements = containerRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Focus the first element
  firstElement.focus();
  
  // Create the event handler
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // If Shift+Tab on first element, move to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } 
      // If Tab on last element, move to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  // Add the event listener
  document.addEventListener('keydown', handleKeyDown);
  
  // Optional callback
  if (callback) callback();
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Announce form errors to screen readers
 * @param fieldName The name of the field with an error
 * @param errorMessage The error message to announce
 */
export function announceFormError(fieldName: string, errorMessage: string): void {
  const message = `Error in ${fieldName}: ${errorMessage}`;
  announceToScreenReader(message, 'assertive');
}

/**
 * Announce successful form submission to screen readers
 * @param formName Optional name of the form that was submitted
 */
export function announceFormSuccess(formName?: string): void {
  const message = formName 
    ? `${formName} submitted successfully` 
    : 'Form submitted successfully';
  announceToScreenReader(message, 'polite');
}

/**
 * Handle keyboard navigation for dropdown menus
 * @param event Keyboard event
 * @param itemCount Total number of items in the dropdown
 * @param currentIndex Current focused item index
 * @returns New index to focus
 */
export function handleDropdownKeyboardNav(
  event: React.KeyboardEvent,
  itemCount: number,
  currentIndex: number
): number {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      return (currentIndex + 1) % itemCount;
    case 'ArrowUp':
      event.preventDefault();
      return (currentIndex - 1 + itemCount) % itemCount;
    case 'Home':
      event.preventDefault();
      return 0;
    case 'End':
      event.preventDefault();
      return itemCount - 1;
    default:
      return currentIndex;
  }
}
