
interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

interface ToastResult {
  toast: (options: ToastOptions) => void;
}

export type Toast = ToastOptions;

export const toast = (options: ToastOptions) => {
  const { title, description, variant = 'default', duration = 3000 } = options;
  
  // Create toast element
  const toastEl = document.createElement('div');
  toastEl.className = `fixed top-4 right-4 p-4 rounded-md shadow-md z-50 max-w-md transition-all duration-300 transform translate-y-0 opacity-0 ${
    variant === 'destructive' ? 'bg-red-600 text-white' :
    variant === 'success' ? 'bg-green-600 text-white' :
    'bg-white text-gray-900 border border-gray-200'
  }`;
  
  // Create title
  const titleEl = document.createElement('div');
  titleEl.className = 'font-medium';
  titleEl.textContent = title;
  toastEl.appendChild(titleEl);
  
  // Create description if provided
  if (description) {
    const descEl = document.createElement('div');
    descEl.className = 'text-sm mt-1';
    descEl.textContent = description;
    toastEl.appendChild(descEl);
  }
  
  // Append to body
  document.body.appendChild(toastEl);
  
  // Animate in
  setTimeout(() => {
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateY(0)';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      document.body.removeChild(toastEl);
    }, 300);
  }, duration);
};

export const useToast = (): ToastResult => {
  return { toast };
};

export default useToast;
