
/**
 * Shows a success toast notification
 * @param message The message to display
 */
export const showSuccess = (message: string) => {
  // In a real application, this would use a toast library
  console.log(`✅ Success: ${message}`);
  
  // This is a simple implementation for demonstration
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

/**
 * Shows an error toast notification
 * @param message The error message to display
 */
export const showError = (message: string) => {
  // In a real application, this would use a toast library
  console.error(`❌ Error: ${message}`);
  
  // This is a simple implementation for demonstration
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

/**
 * Shows an info toast notification
 * @param message The info message to display
 */
export const showInfo = (message: string) => {
  // In a real application, this would use a toast library
  console.log(`ℹ️ Info: ${message}`);
  
  // This is a simple implementation for demonstration
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

/**
 * Shows a warning toast notification
 * @param message The warning message to display
 */
export const showWarning = (message: string) => {
  // In a real application, this would use a toast library
  console.warn(`⚠️ Warning: ${message}`);
  
  // This is a simple implementation for demonstration
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg z-50';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};
