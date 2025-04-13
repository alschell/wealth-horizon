
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
 * @param props - Toast configuration options
 * @returns The toast instance
 */
export function toast(props: ToastProps) {
  const toastOptions: ExternalToast = {
    description: props.description,
    className: props.className,
    duration: props.duration,
  };

  // Add variant-specific styling
  if (props.variant === "destructive") {
    toastOptions.className = `${toastOptions.className || ''} bg-destructive text-destructive-foreground`.trim();
  }

  return sonnerToast(props.title || "", toastOptions);
}

/**
 * Toast hook that returns the toast function for use in components
 * @returns Object containing the toast function
 */
export function useToast() {
  return { toast };
}
