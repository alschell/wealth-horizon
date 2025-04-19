
export function setupGlobalErrorHandler() {
  const handleGlobalError = (event: ErrorEvent) => {
    console.error("Global error:", event.error);
    if (!event.error || event.error._reported) return;
    
    if (event.error) {
      Object.defineProperty(event.error, '_reported', { value: true });
    }
  };
  
  window.addEventListener('error', handleGlobalError);
  return () => window.removeEventListener('error', handleGlobalError);
}
