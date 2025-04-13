
import { toast as sonnerToast, type ToastT } from "sonner";

export type ToastProps = Omit<Parameters<typeof sonnerToast>[0], "id">;

export function toast(props: ToastProps) {
  return sonnerToast(props);
}

// Re-export the useToast hook from the Toaster component
export { toast as useToast } from "sonner";
