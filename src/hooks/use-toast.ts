
import { toast as sonnerToast, type ToastProps as SonnerToastProps } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | string;
  className?: string;
  duration?: number; // Added duration property
};

export function toast(props: ToastProps) {
  return sonnerToast(props as any);
}

// Create a hook that returns the toast function
export function useToast() {
  return { toast };
}
