
import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FileListProps {
  files: File[];
  onDeleteClick: (index: number) => void;
  customFileDeleteButton?: (file: any) => React.ReactNode;
}

const FileList: React.FC<FileListProps> = ({ 
  files, 
  onDeleteClick,
  customFileDeleteButton 
}) => {
  if (!files.length) return null;

  // Safely display file name (truncate if too long)
  const safeDisplayFileName = (fileName: string): string => {
    // Sanitize file name to prevent potential XSS
    const sanitized = fileName.replace(/[^\w\s.-]/g, '');
    return sanitized.length > 25 ? sanitized.substring(0, 22) + '...' : sanitized;
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    return (
      <div className="bg-gray-100 h-9 w-9 rounded flex items-center justify-center text-xs font-medium uppercase text-gray-500">
        {extension || "?"}
      </div>
    );
  };

  return (
    <div className="space-y-2" role="list" aria-label="Uploaded files list">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-white"
          role="listitem"
        >
          <div className="flex items-center space-x-3 overflow-hidden">
            {getFileIcon(file.name)}
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate max-w-[200px] sm:max-w-[300px]" title={file.name}>
                {safeDisplayFileName(file.name)}
              </p>
              <p className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>
          
          {customFileDeleteButton ? (
            customFileDeleteButton(file)
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-red-500"
              onClick={() => onDeleteClick(index)}
              aria-label={`Delete file ${safeDisplayFileName(file.name)}`}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete file</span>
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileList;
