
import { toast as sonnerToast } from "sonner";
import { Toast, toast as defaultToast, useToast as useDefaultToast } from "@/components/ui/toast";

// Re-export the types
export * from "@/components/ui/toast";

export function showSuccessToast(title: string, message: string) {
  toast({
    title,
    description: message,
    variant: "default",
  });
}

export function showErrorToast(title: string, message: string) {
  toast({
    title,
    description: message,
    variant: "destructive",
  });
}

export function showInfoToast(title: string, message: string) {
  toast({
    title,
    description: message,
  });
}

export function toast(props: Toast) {
  return defaultToast(props);
}

export function useToast() {
  return useDefaultToast();
}

// Alternative toast using sonner
export const sonner = {
  success: (message: string, options?: any) => sonnerToast.success(message, options),
  error: (message: string, options?: any) => sonnerToast.error(message, options),
  info: (message: string, options?: any) => sonnerToast.info(message, options),
  warning: (message: string, options?: any) => sonnerToast.warning(message, options),
};
