
import { toast as sonnerToast, type Toast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | string;
  className?: string;
};

export function toast(props: ToastProps) {
  return sonnerToast(props);
}

// Create a hook that returns the toast function
export function useToast() {
  return { toast };
}
