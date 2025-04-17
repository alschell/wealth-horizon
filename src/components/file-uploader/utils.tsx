
import React from 'react';
import { File, Image, FileText, FilePenLine, FileArchive } from 'lucide-react';

/**
 * Returns the appropriate icon based on file mime type
 */
export const getFileIcon = (file: File) => {
  const type = file.type;

  if (type.startsWith('image/')) {
    return <Image className="h-5 w-5 text-blue-500" />;
  } else if (type === 'application/pdf') {
    return <FileText className="h-5 w-5 text-red-500" />;
  } else if (type.includes('word') || type.includes('document')) {
    return <FilePenLine className="h-5 w-5 text-blue-700" />;
  } else if (type.includes('zip') || type.includes('compressed')) {
    return <FileArchive className="h-5 w-5 text-yellow-600" />;
  } else {
    return <File className="h-5 w-5 text-gray-500" />;
  }
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }
};

/**
 * Validate file by type and size
 */
export const validateFile = (
  file: File, 
  acceptedFileTypes?: string, 
  maxSizeBytes?: number
): { valid: boolean; error?: string } => {
  // Check file type
  if (acceptedFileTypes) {
    const types = acceptedFileTypes.split(',');
    const fileType = file.type;
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    const typeMatches = types.some(type => {
      // Handle mime types (e.g. 'image/png')
      if (type.includes('/')) {
        if (type.endsWith('*')) {
          // Handle wildcards like 'image/*'
          const typePrefix = type.split('/*')[0];
          return fileType.startsWith(typePrefix);
        }
        return type === fileType;
      } 
      // Handle extensions (e.g. '.pdf')
      return type === fileExtension;
    });
    
    if (!typeMatches) {
      return { 
        valid: false, 
        error: `File type not accepted. Please upload ${acceptedFileTypes.replace(/,/g, ', ')}` 
      };
    }
  }
  
  // Check file size
  if (maxSizeBytes && file.size > maxSizeBytes) {
    const maxSizeFormatted = formatFileSize(maxSizeBytes);
    return { 
      valid: false, 
      error: `File too large. Maximum size is ${maxSizeFormatted}` 
    };
  }
  
  return { valid: true };
};
