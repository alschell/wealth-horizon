
/**
 * Sets up global error handling for the application
 */
export function setupGlobalErrorHandler() {
  const handleGlobalError = (event: ErrorEvent) => {
    // Prevent duplicate error reporting
    if (!event.error || event.error._reported) return;
    
    console.error("Global error caught:", event.error);
    
    // Mark this error as reported to prevent duplicate logging
    if (event.error) {
      Object.defineProperty(event.error, '_reported', { value: true });
    }
    
    // You can add additional error handling here (analytics, logging, etc)
  };
  
  // Handle unhandled promise rejections
  const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    console.error("Unhandled promise rejection:", event.reason);
    // Prevent the default handling to avoid duplicate console logs
    event.preventDefault();
  };
  
  // Add event listeners
  window.addEventListener('error', handleGlobalError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('error', handleGlobalError);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  };
}
