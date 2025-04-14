
import { toast } from '@/hooks/use-toast';

/**
 * Show a toast notification for documentation
 */
export function showDocumentationToast(title: string, description?: string): void {
  toast({
    title,
    description,
    variant: "default",
  });
}

/**
 * Show a toast notification for successful copy operation
 */
export function showCopySuccessToast(message: string = "Copied to clipboard"): void {
  toast({
    title: "Success",
    description: message,
  });
}

/**
 * Show a toast notification for download operation
 */
export function showDownloadToast(title: string, description?: string): void {
  toast({
    title,
    description: description || "Your download has started",
  });
}
