
import { toast } from '@/hooks/use-toast';

/**
 * Show a toast notification for documentation links
 */
export const showDocumentationToast = (title: string) => {
  toast({
    title,
    description: "Check out the documentation for more information.",
    action: {
      label: "View Docs",
      onClick: () => console.log("Documentation link clicked")
    }
  });
};

/**
 * Show a toast notification for successful copy operations
 */
export const showCopySuccessToast = (itemType: string = "Content") => {
  toast({
    title: "Copied to Clipboard",
    description: `${itemType} has been copied to your clipboard.`,
    variant: "default"
  });
};

/**
 * Show a toast notification for download operations
 */
export const showDownloadToast = (fileName: string) => {
  toast({
    title: "Download Started",
    description: `${fileName} is being downloaded.`,
    variant: "default"
  });
};
