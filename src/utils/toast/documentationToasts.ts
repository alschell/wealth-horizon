
import { toast } from "@/hooks/use-toast";

/**
 * Show a toast notification for documentation actions
 */
export function showDocumentationToast(title: string, description?: string, duration = 3000) {
  toast({
    title,
    description,
    duration
  });
}

/**
 * Show a success toast notification for copy actions
 */
export function showCopySuccessToast(description = "You can now paste it in your application") {
  toast({
    title: "Code copied to clipboard",
    description,
    duration: 3000
  });
}

/**
 * Show a success toast notification for download actions
 */
export function showDownloadToast(sdkName: string, version: string) {
  // Initial toast for download start
  toast({
    title: `Downloading ${sdkName} SDK v${version}`,
    description: "Your download will begin shortly",
  });
  
  // Delayed toast for download completion
  setTimeout(() => {
    toast({
      title: "Download complete",
      description: `${sdkName} SDK v${version} has been downloaded`,
      duration: 3000,
    });
  }, 1500);
}
