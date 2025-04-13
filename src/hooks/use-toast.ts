
import { toast as sonnerToast, type ExternalToast } from "sonner";

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  className?: string;
  duration?: number;
};

/**
 * Custom toast function that wraps Sonner toast with our preferred API
 */
export function toast(props: ToastProps) {
  return sonnerToast(props.title || "", {
    description: props.description,
    className: props.className,
    duration: props.duration,
    intent: props.variant === "destructive" ? "error" : undefined
  });
}

/**
 * Toast hook that returns the toast function for use in components
 */
export function useToast() {
  return { toast };
}
