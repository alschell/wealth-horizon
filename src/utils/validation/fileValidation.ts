
/**
 * File validation utilities with enhanced security
 * 
 * @module fileValidation
 */

/**
 * File validation options with improved typing
 */
export interface FileValidationOptions {
  /** Maximum file size in MB */
  maxSizeMB?: number;
  /** Minimum file size in KB (prevents empty files) */
  minSizeKB?: number;
  /** Allowed MIME types */
  allowedTypes?: string[];
  /** Allowed file extensions */
  allowedExtensions?: string[];
  /** Whether to perform deeper content scanning */
  scanContent?: boolean;
  /** Maximum image dimensions (if applicable) */
  maxImageDimensions?: { width: number; height: number };
  /** Validate image aspect ratio */
  aspectRatio?: { width: number; height: number; tolerance?: number };
}

/**
 * Comprehensive file validation result
 */
export interface FileValidationResult {
  /** Whether the file is valid */
  valid: boolean;
  /** Error message if invalid */
  message: string | null;
  /** Additional validation details */
  details?: {
    /** File size in bytes */
    size?: number;
    /** Detected MIME type */
    detectedType?: string;
    /** File extension */
    extension?: string;
    /** Image dimensions if applicable */
    dimensions?: { width: number; height: number };
  };
}

/**
 * Validates file size with detailed feedback
 * 
 * @param file - File to validate
 * @param maxSizeMB - Maximum size in MB
 * @param minSizeKB - Minimum size in KB
 * @returns Validation result
 */
export const validateFileSize = (
  file: File, 
  maxSizeMB?: number,
  minSizeKB?: number
): FileValidationResult => {
  try {
    const maxSizeBytes = maxSizeMB ? maxSizeMB * 1024 * 1024 : undefined;
    const minSizeBytes = minSizeKB ? minSizeKB * 1024 : undefined;
    
    if (maxSizeBytes && file.size > maxSizeBytes) {
      return {
        valid: false,
        message: `File size (${formatFileSize(file.size)}) exceeds the maximum allowed size of ${maxSizeMB}MB`,
        details: { size: file.size }
      };
    }
    
    if (minSizeBytes && file.size < minSizeBytes) {
      return {
        valid: false,
        message: `File size (${formatFileSize(file.size)}) is below the minimum required size of ${minSizeKB}KB`,
        details: { size: file.size }
      };
    }
    
    return {
      valid: true,
      message: null,
      details: { size: file.size }
    };
  } catch (error) {
    console.error("File size validation error:", error);
    return {
      valid: false,
      message: "File size validation failed"
    };
  }
};

/**
 * Validates file type with MIME checking
 * 
 * @param file - File to validate
 * @param allowedTypes - Allowed MIME types
 * @param allowedExtensions - Allowed file extensions
 * @returns Validation result
 */
export const validateFileType = (
  file: File,
  allowedTypes?: string[],
  allowedExtensions?: string[]
): FileValidationResult => {
  try {
    // Check file extension
    const fileName = file.name.toLowerCase();
    const fileExtension = `.${fileName.split('.').pop()}`;
    
    // Check MIME type
    const mimeType = file.type;
    
    // Validation based on MIME types
    if (allowedTypes && allowedTypes.length > 0) {
      const isValidMimeType = allowedTypes.some(type => 
        // Allow wildcard MIME types like image/* or */pdf
        type.includes('*') 
          ? mimeType.match(new RegExp(type.replace('*', '.*')))
          : mimeType === type
      );
      
      if (!isValidMimeType) {
        return {
          valid: false,
          message: `File type "${mimeType}" is not allowed. Allowed types: ${allowedTypes.join(', ')}`,
          details: { detectedType: mimeType, extension: fileExtension }
        };
      }
    }
    
    // Validation based on file extensions
    if (allowedExtensions && allowedExtensions.length > 0) {
      const isValidExtension = allowedExtensions.some(ext => 
        fileExtension.toLowerCase() === ext.toLowerCase()
      );
      
      if (!isValidExtension) {
        return {
          valid: false,
          message: `File extension "${fileExtension}" is not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`,
          details: { detectedType: mimeType, extension: fileExtension }
        };
      }
    }
    
    return {
      valid: true,
      message: null,
      details: { detectedType: mimeType, extension: fileExtension }
    };
  } catch (error) {
    console.error("File type validation error:", error);
    return {
      valid: false,
      message: "File type validation failed"
    };
  }
};

/**
 * Comprehensive file validation with multiple criteria
 * 
 * @param file - File to validate
 * @param options - Validation options
 * @returns Promise resolving to validation result
 */
export const validateFile = async (
  file: File,
  options: FileValidationOptions = {}
): Promise<FileValidationResult> => {
  try {
    const { 
      maxSizeMB, 
      minSizeKB, 
      allowedTypes, 
      allowedExtensions,
      scanContent = false,
      maxImageDimensions,
      aspectRatio
    } = options;
    
    // Check file size
    const sizeResult = validateFileSize(file, maxSizeMB, minSizeKB);
    if (!sizeResult.valid) {
      return sizeResult;
    }
    
    // Check file type
    const typeResult = validateFileType(file, allowedTypes, allowedExtensions);
    if (!typeResult.valid) {
      return typeResult;
    }
    
    // Deeper content validation for images
    if (scanContent && file.type.startsWith('image/')) {
      try {
        const imageDimensions = await getImageDimensions(file);
        
        // Check maximum dimensions
        if (maxImageDimensions) {
          const { width, height } = maxImageDimensions;
          
          if (imageDimensions.width > width || imageDimensions.height > height) {
            return {
              valid: false,
              message: `Image dimensions (${imageDimensions.width}x${imageDimensions.height}) exceed the maximum allowed (${width}x${height})`,
              details: { dimensions: imageDimensions }
            };
          }
        }
        
        // Check aspect ratio
        if (aspectRatio) {
          const { width, height, tolerance = 0.1 } = aspectRatio;
          const targetRatio = width / height;
          const actualRatio = imageDimensions.width / imageDimensions.height;
          
          const ratioLowerBound = targetRatio * (1 - tolerance);
          const ratioUpperBound = targetRatio * (1 + tolerance);
          
          if (actualRatio < ratioLowerBound || actualRatio > ratioUpperBound) {
            return {
              valid: false,
              message: `Image aspect ratio (${actualRatio.toFixed(2)}) does not match the required ratio of ${targetRatio.toFixed(2)}`,
              details: { dimensions: imageDimensions }
            };
          }
        }
        
        return {
          valid: true,
          message: null,
          details: { 
            size: file.size,
            detectedType: file.type,
            dimensions: imageDimensions
          }
        };
      } catch (error) {
        return {
          valid: false,
          message: "Image validation failed: Unable to process image",
        };
      }
    }
    
    return {
      valid: true,
      message: null,
      details: { 
        size: file.size,
        detectedType: file.type
      }
    };
  } catch (error) {
    console.error("File validation error:", error);
    return {
      valid: false,
      message: "File validation failed"
    };
  }
};

/**
 * Helper to get image dimensions
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Helper to format file size
 */
function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
