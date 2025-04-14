
import React from 'react';
import { File, FileImage, FileText, FileArchive, FileCode, FileBarChart, FileAudio, FileVideo } from 'lucide-react';

/**
 * Get appropriate file icon based on file type
 */
export function getFileIcon(file: File): React.ReactNode {
  const type = file.type;
  
  if (type.startsWith('image/')) {
    return <FileImage className="h-5 w-5 text-blue-500" />;
  } else if (type === 'application/pdf') {
    return <FileText className="h-5 w-5 text-red-500" />;
  } else if (type.startsWith('text/')) {
    return <FileText className="h-5 w-5 text-gray-500" />;
  } else if (type.includes('spreadsheet') || type.includes('excel')) {
    return <FileBarChart className="h-5 w-5 text-green-500" />;
  } else if (type.startsWith('audio/')) {
    return <FileAudio className="h-5 w-5 text-purple-500" />;
  } else if (type.startsWith('video/')) {
    return <FileVideo className="h-5 w-5 text-orange-500" />;
  } else if (type.includes('zip') || type.includes('compressed')) {
    return <FileArchive className="h-5 w-5 text-yellow-500" />;
  } else if (type.includes('javascript') || type.includes('json') || type.includes('html') || type.includes('css')) {
    return <FileCode className="h-5 w-5 text-indigo-500" />;
  } else {
    return <File className="h-5 w-5 text-gray-500" />;
  }
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}

/**
 * Check if file is an image
 */
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

/**
 * Create an object URL for a file
 */
export function createFilePreviewUrl(file: File): string {
  return URL.createObjectURL(file);
}

/**
 * Clean up object URLs to prevent memory leaks
 */
export function revokeFilePreviewUrl(url: string): void {
  URL.revokeObjectURL(url);
}
