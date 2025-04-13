
import { toast as sonnerToast } from "sonner";
import { type Toast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | string;
  className?: string;
  duration?: number;
};

export function toast(props: ToastProps) {
  return sonnerToast(props.title || "", {
    description: props.description,
    className: props.className,
    duration: props.duration,
    // Map variant to Sonner's toast types
    type: props.variant === "destructive" ? "error" : "default"
  });
}

// Create a hook that returns the toast function
export function useToast() {
  return { toast };
}
