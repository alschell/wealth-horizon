
import { useToast as useToastShadcn } from "@/components/ui/use-toast";
import { toast as toastShadcn } from "@/components/ui/use-toast";

// Re-export useToast hook
export const useToast = useToastShadcn;

// Create a toast function for direct use without the hook
export const toast = toastShadcn;

// Default export for backward compatibility
export default useToastShadcn;
