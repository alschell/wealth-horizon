
import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle, X, File, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { FilePreview } from './FilePreview';

export interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedFileTypes?: string[];
  multiple?: boolean;
  className?: string;
  label?: string;
  description?: string;
  showPreview?: boolean;
  initialFiles?: File[];
  error?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedFileTypes = ['image/*', 'application/pdf'],
  multiple = true,
  className,
  label = 'Upload files',
  description = 'Drag and drop files here or click to browse',
  showPreview = true,
  initialFiles = [],
  error
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [fileError, setFileError] = useState<string | null>(error || null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errorMessages = rejectedFiles.map(rejected => {
        const errors = rejected.errors.map((err: any) => err.message).join(', ');
        return `${rejected.file.name}: ${errors}`;
      });
      
      setFileError(errorMessages.join('; '));
      return;
    }

    // Check if adding these files would exceed the maxFiles limit
    if (!multiple && acceptedFiles.length > 0) {
      // Replace existing file with the new one
      const newFiles = [acceptedFiles[0]];
      setFiles(newFiles);
      setFileError(null);
      onFilesSelected(newFiles);
    } else if (files.length + acceptedFiles.length <= maxFiles) {
      // Add new files to existing ones
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      setFileError(null);
      onFilesSelected(newFiles);
    } else {
      setFileError(`You can upload a maximum of ${maxFiles} files`);
    }
  }, [files, maxFiles, multiple, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
    
    if (newFiles.length <= maxFiles) {
      setFileError(null);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:bg-gray-50",
          fileError && "border-red-500 bg-red-50",
          className
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center p-4">
          <Upload className={cn(
            "h-10 w-10 mb-2",
            isDragActive ? "text-primary" : "text-gray-400",
            fileError && "text-red-500"
          )} />
          
          <h3 className="text-lg font-medium">{label}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          
          {fileError && (
            <div className="flex items-center text-red-500 mt-2">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{fileError}</span>
            </div>
          )}
          
          <div className="mt-4">
            <Button 
              type="button" 
              variant="outline"
              size="sm"
              onClick={e => e.stopPropagation()}
            >
              Browse files
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            Max {maxFiles} file{maxFiles !== 1 ? 's' : ''}, up to {Math.round(maxSize / (1024 * 1024))}MB each
          </div>
        </div>
      </div>
      
      {showPreview && files.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Selected files ({files.length}/{maxFiles})</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <FilePreview
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => removeFile(index)}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
