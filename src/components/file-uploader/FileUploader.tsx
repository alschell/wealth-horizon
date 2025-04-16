
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { FilePreview } from './FilePreview';
import DropZone from './DropZone';
import FileList from './FileList';
import { validateFileSize, validateFileType } from '@/utils/validation/fileValidation';
import { useFileUploader } from './useFileUploader';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxSizeMB?: number;
  accept?: string;
  multiple?: boolean;
  className?: string;
  files?: File[];
  initialFiles?: File[];
  label?: string;
  disabled?: boolean;
  customFileDeleteButton?: (file: File) => React.ReactNode;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxSizeMB = 5,
  accept = "image/*,application/pdf",
  multiple = true,
  className = "",
  files,
  initialFiles = [],
  label = "Upload Files",
  disabled = false,
  customFileDeleteButton
}) => {
  const {
    files: selectedFiles,
    errors,
    addFiles,
    removeFile,
    clearFiles
  } = useFileUploader({
    maxFiles: multiple ? 5 : 1,
    maxSizeMB,
    acceptedTypes: accept.split(',').map(type => type.trim()),
    initialFiles: initialFiles.length > 0 ? initialFiles : (files || []),
    onFilesChange: onFilesSelected
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
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
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Use the DropZone component
  return (
    <div className={`w-full ${className}`}>
      {/* File upload area */}
      <div
        onDragEnter={!disabled ? handleDrag : undefined}
        onDragOver={!disabled ? handleDrag : undefined}
        onDragLeave={!disabled ? handleDrag : undefined}
        onDrop={!disabled ? handleDrop : undefined}
      >
        <DropZone
          label={label}
          accept={accept}
          maxSize={maxSizeMB}
          isDragging={dragActive}
          onClick={handleClick}
          onDragOver={handleDrag}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          disabled={disabled}
        />
        
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
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
          <FileList 
            files={selectedFiles} 
            onDeleteClick={removeFile}
            customFileDeleteButton={customFileDeleteButton}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
