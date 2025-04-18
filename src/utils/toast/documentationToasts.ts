
/**
 * Specialized toast utilities for documentation-related actions
 */

import { showSuccess, showInfo } from './toastUtils';

/**
 * Show a toast for successful documentation access
 * @param docName Name of the documentation being viewed
 * @param description Optional custom description
 */
export const showDocumentationToast = (docName: string, description?: string) => {
  showInfo(
    'Documentation Opened', 
    description || `You're now viewing documentation for ${docName}`
  );
};

/**
 * Show a toast for successful copy operation
 * @param itemType Type of item copied (default: 'text')
 */
export const showCopySuccessToast = (itemType: string = 'text') => {
  showSuccess(
    'Copied to Clipboard', 
    `The ${itemType} has been copied to your clipboard`
  );
};

/**
 * Show a toast for successful download operation
 * @param fileName Name of the file being downloaded
 * @param version Optional version number of the file
 */
export const showDownloadToast = (fileName: string, version?: string) => {
  showSuccess(
    'Download Started', 
    version ? `${fileName} v${version} is being downloaded` : `${fileName} is being downloaded`
  );
};
