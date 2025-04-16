
import React from 'react';
import { X, FileText, FileImage, FileVideo, File, FileArchive, FileAudio } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
  className?: string;
  showPreview?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  className,
  showPreview = true,
  size = 'md',
}) => {
  const getFileIcon = () => {
    const fileType = file.type.split('/')[0];
    
    switch (fileType) {
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <FileVideo className="h-5 w-5 text-purple-500" />;
      case 'audio':
        return <FileAudio className="h-5 w-5 text-green-500" />;
      case 'application':
        if (file.type.includes('pdf')) {
          return <FileText className="h-5 w-5 text-red-500" />;
        } else if (file.type.includes('zip') || file.type.includes('compressed')) {
          return <FileArchive className="h-5 w-5 text-amber-500" />;
        }
        return <File className="h-5 w-5 text-gray-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getImagePreview = () => {
    if (!showPreview || !file.type.startsWith('image/')) {
      return null;
    }
    
    const previewUrl = URL.createObjectURL(file);
    
    return (
      <div className="flex-shrink-0 mr-3">
        <img 
          src={previewUrl} 
          alt={file.name} 
          className={cn(
            "rounded object-cover",
            size === 'sm' ? 'h-8 w-8' : size === 'md' ? 'h-10 w-10' : 'h-12 w-12'
          )}
          onLoad={() => URL.revokeObjectURL(previewUrl)}
        />
      </div>
    );
  };
  
  const sizeInKB = Math.round(file.size / 1024);
  const sizeText = sizeInKB > 1024 
    ? `${(sizeInKB / 1024).toFixed(2)} MB` 
    : `${sizeInKB} KB`;
  
  return (
    <div className={cn(
      "flex items-center p-2 border rounded bg-white",
      size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base',
      className
    )}>
      {getImagePreview()}
      
      <div className="flex items-center flex-1 min-w-0">
        <div className="mr-2 flex-shrink-0">
          {getFileIcon()}
        </div>
        
        <div className="flex-1 truncate">
          <div className="font-medium truncate" title={file.name}>
            {file.name}
          </div>
          <div className="text-gray-500 text-xs">
            {sizeText}
          </div>
        </div>
      </div>
      
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-gray-100"
          aria-label="Remove file"
        >
          <X className={cn(
            "text-gray-500",
            size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
          )} />
        </button>
      )}
    </div>
  );
};
