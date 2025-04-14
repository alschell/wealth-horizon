
import React from 'react';
import { File, X, CheckCircle, Image, FileText, FilePenLine, FileArchive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFileIcon } from './utils';

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file, onRemove }) => {
  const fileIcon = getFileIcon(file);
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
      <div className="flex items-center space-x-3">
        {fileIcon}
        <div className="flex flex-col">
          <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
          <span className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
        </div>
      </div>
      
      <Button 
        size="icon" 
        variant="ghost" 
        className="h-8 w-8 text-gray-500 hover:text-red-500"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
