
/**
 * Specialized toast utilities for documentation-related actions
 */

import { showSuccess, showInfo } from './toastUtils';

/**
 * Show a toast for successful documentation access
 */
export const showDocumentationToast = (docName: string) => {
  showInfo(
    'Documentation Opened', 
    `You're now viewing documentation for ${docName}`
  );
};

/**
 * Show a toast for successful copy operation
 */
export const showCopySuccessToast = (itemType: string = 'text') => {
  showSuccess(
    'Copied to Clipboard', 
    `The ${itemType} has been copied to your clipboard`
  );
};

/**
 * Show a toast for successful download operation
 */
export const showDownloadToast = (fileName: string) => {
  showSuccess(
    'Download Started', 
    `${fileName} is being downloaded`
  );
};
