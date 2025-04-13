
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
  
  // Store previously focused element to restore focus when trap is released
  const previouslyFocused = document.activeElement as HTMLElement;
  
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
    } else if (e.key === 'Escape') {
      // Allow escape key to close the modal
      const closeButton = container.querySelector('[aria-label="Close"]') as HTMLElement;
      if (closeButton) {
        closeButton.click();
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
};

// Create a skip link for keyboard users
export const createSkipLink = (): void => {
  // Check if skip link already exists
  if (document.querySelector('.skip-link')) return;
  
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:p-2 focus:bg-white focus:z-50';
  skipLink.textContent = 'Skip to main content';
  
  // Insert at the beginning of the body
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Create a main content ID if it doesn't exist
  const mainContent = document.querySelector('main');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }
};

// Add accessibility enhancements to forms
export const makeFormAccessible = (form: HTMLFormElement): void => {
  // Find all inputs
  const inputs = form.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    // Ensure each input has an associated label
    const inputId = input.id || `input-${Math.random().toString(36).substring(2, 9)}`;
    input.id = inputId;
    
    // Find associated label or create one if missing
    const label = form.querySelector(`label[for="${inputId}"]`);
    if (!label) {
      const previousElement = input.previousElementSibling;
      if (previousElement && previousElement.tagName === 'LABEL' && !previousElement.getAttribute('for')) {
        previousElement.setAttribute('for', inputId);
      }
    }
    
    // Add required attribute and aria-required for required fields
    if (input.hasAttribute('required')) {
      input.setAttribute('aria-required', 'true');
    }
    
    // Connect error messages with aria-describedby
    const errorId = `error-${inputId}`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.setAttribute('role', 'alert');
      input.setAttribute('aria-describedby', errorId);
    }
  });
  
  // Add role="form" and accessible name if not present
  if (!form.hasAttribute('role')) {
    form.setAttribute('role', 'form');
  }
  
  if (!form.hasAttribute('aria-labelledby')) {
    const heading = form.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && heading.id) {
      form.setAttribute('aria-labelledby', heading.id);
    }
  }
};

// Create accessible color scheme toggle
export const createColorSchemeToggle = (
  containerId: string, 
  options: { 
    lightLabel?: string,
    darkLabel?: string,
    initialMode?: 'light' | 'dark' | 'system'
  } = {}
): void => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const {
    lightLabel = 'Light theme',
    darkLabel = 'Dark theme',
    initialMode = 'system'
  } = options;
  
  // Create the toggle
  const toggle = document.createElement('button');
  toggle.setAttribute('type', 'button');
  toggle.setAttribute('aria-pressed', initialMode === 'dark' ? 'true' : 'false');
  toggle.setAttribute('aria-label', initialMode === 'dark' ? darkLabel : lightLabel);
  
  // Set initial state based on user preference or system
  let currentMode = initialMode;
  
  if (currentMode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentMode = prefersDark ? 'dark' : 'light';
  }
  
  // Apply initial theme
  if (currentMode === 'dark') {
    document.documentElement.classList.add('dark');
    toggle.textContent = '🌙';
  } else {
    document.documentElement.classList.remove('dark');
    toggle.textContent = '☀️';
  }
  
  // Add toggle functionality
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.setAttribute('aria-label', isDark ? darkLabel : lightLabel);
    toggle.textContent = isDark ? '🌙' : '☀️';
    
    // Announce change to screen readers
    announceToScreenReader(`Changed to ${isDark ? 'dark' : 'light'} mode`, 'polite');
    
    // Save preference
    localStorage.setItem('color-scheme', isDark ? 'dark' : 'light');
  });
  
  // Style the toggle
  toggle.className = 'p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  // Add to container
  container.appendChild(toggle);
  
  // Listen for system preference changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    // Only auto-change if user hasn't explicitly set a preference
    if (!localStorage.getItem('color-scheme')) {
      const shouldBeDark = e.matches;
      document.documentElement.classList.toggle('dark', shouldBeDark);
      toggle.setAttribute('aria-pressed', shouldBeDark ? 'true' : 'false');
      toggle.setAttribute('aria-label', shouldBeDark ? darkLabel : lightLabel);
      toggle.textContent = shouldBeDark ? '🌙' : '☀️';
    }
  });
};

// Add basic accessibility to tables
export const makeTableAccessible = (table: HTMLTableElement): void => {
  // Ensure the table has proper role
  table.setAttribute('role', 'table');
  
  // Add caption if not present
  if (!table.querySelector('caption')) {
    const tableHeading = table.parentElement?.querySelector('h2, h3, h4');
    if (tableHeading) {
      const caption = document.createElement('caption');
      caption.className = 'sr-only'; // Visually hidden but available to screen readers
      caption.textContent = tableHeading.textContent;
      table.prepend(caption);
    }
  }
  
  // Ensure thead and tbody are properly marked up
  const rows = table.querySelectorAll('tr');
  
  if (rows.length > 0 && !table.querySelector('thead')) {
    const thead = document.createElement('thead');
    thead.appendChild(rows[0]);
    table.prepend(thead);
    
    // Mark header cells
    const headerCells = rows[0].querySelectorAll('th, td');
    headerCells.forEach(cell => {
      cell.setAttribute('scope', 'col');
      if (cell.tagName === 'TD') {
        // Convert to th for semantic correctness
        const th = document.createElement('th');
        th.innerHTML = cell.innerHTML;
        th.className = cell.className;
        th.setAttribute('scope', 'col');
        cell.parentNode?.replaceChild(th, cell);
      }
    });
  }
  
  // Add tbody if necessary
  if (!table.querySelector('tbody') && rows.length > 1) {
    const tbody = document.createElement('tbody');
    // Start from index 1 if we have a header row
    const startIndex = table.querySelector('thead') ? 1 : 0;
    for (let i = startIndex; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
    }
    table.appendChild(tbody);
  }
  
  // Add row headers if appropriate
  const firstCells = table.querySelectorAll('tbody > tr > td:first-child');
  const shouldAddRowHeaders = Array.from(firstCells).every(
    cell => cell.textContent && cell.textContent.trim() !== ''
  );
  
  if (shouldAddRowHeaders) {
    firstCells.forEach(cell => {
      const th = document.createElement('th');
      th.innerHTML = cell.innerHTML;
      th.className = cell.className;
      th.setAttribute('scope', 'row');
      cell.parentNode?.replaceChild(th, cell);
    });
  }
};

// Initialize the accessibility features
export const initializeAccessibility = (): void => {
  // Create skip link
  createSkipLink();
  
  // Add A11y dialog hooks
  document.addEventListener('DOMContentLoaded', () => {
    // Make all dialogs accessible
    const dialogs = document.querySelectorAll('[role="dialog"]');
    dialogs.forEach(dialog => {
      dialog.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const closeButton = dialog.querySelector('button[aria-label="Close"]');
          if (closeButton) (closeButton as HTMLElement).click();
        }
      });
    });
    
    // Make interactive elements keyboard accessible
    const clickableElements = document.querySelectorAll('.clickable, [role="button"]');
    clickableElements.forEach(el => makeKeyboardAccessible(el as HTMLElement));
    
    // Make forms accessible
    const forms = document.querySelectorAll('form');
    forms.forEach(form => makeFormAccessible(form));
    
    // Make tables accessible
    const tables = document.querySelectorAll('table');
    tables.forEach(table => makeTableAccessible(table));
  });
};
