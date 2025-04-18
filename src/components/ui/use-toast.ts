
import { useToast as useToastHook } from "@/hooks/use-toast";
import { toast as toastFunction } from "@/hooks/use-toast";
import { type Toast } from "@/hooks/use-toast";

export const useToast = useToastHook;
export const toast = toastFunction;
export type { Toast };
