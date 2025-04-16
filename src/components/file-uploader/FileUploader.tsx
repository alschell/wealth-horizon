
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { FilePreview } from './FilePreview';
import { validateFileSize, validateFileType } from '@/utils/validation/fileValidation';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  files?: File[];
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxSizeMB = 5,
  accept = "image/*,application/pdf",
  multiple = true,
  className = "",
  files = []
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>(files);
  const [errors, setErrors] = useState<string[]>([]);

  // Parse accepted file types
  const acceptedTypes = accept.split(',').map(type => type.trim());

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Process selected files
  const handleFiles = (newFiles: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];
    
    // Check if adding new files would exceed maxFiles limit
    if (selectedFiles.length + newFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
      // Only process files up to the limit
      newFiles = newFiles.slice(0, maxFiles - selectedFiles.length);
    }
    
    // Validate each file
    for (const file of newFiles) {
      // Validate file size
      const sizeValidation = validateFileSize(file, maxSizeMB);
      if (!sizeValidation.valid) {
        newErrors.push(sizeValidation.message || '');
        continue;
      }
      
      // Validate file type
      const typeValidation = validateFileType(file, acceptedTypes);
      if (!typeValidation.valid) {
        newErrors.push(typeValidation.message || '');
        continue;
      }
      
      validFiles.push(file);
    }
    
    // Update state with valid files
    if (validFiles.length > 0) {
      const updatedFiles = [...selectedFiles, ...validFiles];
      setSelectedFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    }
    
    // Update error state
    setErrors(newErrors);
  };

  // Remove a file
  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* File upload area */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <Upload className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag and drop files here, or <span className="text-blue-600 font-medium">browse</span>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {multiple ? `Up to ${maxFiles} files` : 'One file'} (max {maxSizeMB}MB each)
        </p>
        <input
          id="file-upload"
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((error, index) => (
            <p key={index} className="text-sm text-red-500 flex items-center">
              <X className="h-4 w-4 mr-1" />
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Selected files preview */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <FilePreview
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
