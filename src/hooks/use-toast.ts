
import { toast as sonnerToast } from "sonner";
import { ToastAction, type ToastProps, type ToastActionElement } from "@/components/ui/toast";
import { useToast as useToastPrimitive } from "@/components/ui/use-toast";

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

export interface Toast extends ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

export function toast(props: Toast) {
  const { toast } = useToastPrimitive();
  return toast(props);
}

export function useToast() {
  return useToastPrimitive();
}

// Alternative toast using sonner
export const sonner = {
  success: (message: string, options?: any) => sonnerToast.success(message, options),
  error: (message: string, options?: any) => sonnerToast.error(message, options),
  info: (message: string, options?: any) => sonnerToast.info(message, options),
  warning: (message: string, options?: any) => sonnerToast.warning(message, options),
};
