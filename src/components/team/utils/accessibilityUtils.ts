/**
 * Utility functions and constants for enhancing accessibility in team components
 */

// Common ARIA label templates
export const ARIA_LABELS = {
  leadershipSection: 'Leadership team section',
  advisorySection: 'Advisory board section',
  teamMemberCard: 'Team member information',
  advisorCard: 'Advisor information',
  searchFilter: 'Filter team members',
  sortFilter: 'Sort team members',
  noResults: 'No search results found',
  loading: 'Loading team data',
  error: 'Error loading team data',
  socialLinks: 'Social media profiles'
};

// Common keypress handler for team components
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  callback: () => void
): void {
  // Handle Enter and Space key presses
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
}

// Interface for common accessibility props
export interface AccessibilityProps {
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-busy'?: boolean;
  tabIndex?: number;
}

// Generate common accessibility props for team components
export function generateAccessibilityProps(
  componentType: 'section' | 'card' | 'filter' | 'list' | 'button',
  options: {
    id?: string;
    isLoading?: boolean;
    hasError?: boolean;
    label?: string;
  } = {}
): AccessibilityProps {
  const { id, isLoading = false, hasError = false, label } = options;
  
  // Base props based on component type
  const baseProps: AccessibilityProps = {
    tabIndex: 0,
  };
  
  // Additional props based on component type
  switch (componentType) {
    case 'section':
      baseProps.role = 'region';
      baseProps['aria-labelledby'] = id;
      if (isLoading) {
        baseProps['aria-busy'] = true;
        baseProps['aria-live'] = 'polite';
      }
      break;
    case 'card':
      baseProps.role = 'article';
      baseProps['aria-label'] = label || '';
      break;
    case 'filter':
      baseProps.role = 'search';
      baseProps['aria-label'] = label || ARIA_LABELS.searchFilter;
      break;
    case 'list':
      baseProps.role = 'list';
      baseProps['aria-label'] = label || '';
      break;
    case 'button':
      baseProps.role = 'button';
      baseProps['aria-label'] = label || '';
      break;
  }
  
  return baseProps;
}

// Focus management utilities
export const focusManagement = {
  /**
   * Traps focus within an element for modals and dialogs
   */
  trapFocus(element: HTMLElement): () => void {
    // Keep track of the previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;
    
    // Find all focusable elements
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return () => {};
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Set initial focus
    firstElement.focus();
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift+Tab: If focus is on first element, move to last
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: If focus is on last element, move to first
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
      
      // Handle Escape key to close dialogs
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleKeyDown);
        previouslyFocused?.focus();
      }
    };
    
    // Attach the keyboard listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }
};
