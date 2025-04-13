
import { toast as sonnerToast, type Toast, type ToasterToast } from "sonner";

export type ToastProps = Omit<ToasterToast, "id">;

export function toast(props: ToastProps) {
  return sonnerToast(props);
}

export { useToast } from "sonner";
