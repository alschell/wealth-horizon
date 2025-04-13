
import { toast as sonnerToast } from "sonner";
import type { ExternalToast } from "sonner";

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
    // Map variant to Sonner's toast types using the correct property
    ...(props.variant === "destructive" ? { intent: "error" } : {})
  });
}

// Create a hook that returns the toast function
export function useToast() {
  return { toast };
}
