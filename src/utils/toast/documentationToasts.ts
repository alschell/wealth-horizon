
/**
 * Specialized toast utilities for documentation-related actions
 */

import { showSuccess, showInfo } from './toastUtils';

/**
 * Show a toast for successful documentation access
 */
export const showDocumentationToast = (docName: string, description?: string) => {
  showInfo(
    'Documentation Opened', 
    description || `You're now viewing documentation for ${docName}`
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
export const showDownloadToast = (fileName: string, version?: string) => {
  showSuccess(
    'Download Started', 
    version ? `${fileName} v${version} is being downloaded` : `${fileName} is being downloaded`
  );
};
