import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Upload, X, FileText } from "lucide-react";

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesSelected: (files: File[]) => void;
  existingFiles?: File[];
  label?: string;
  onFileDelete?: (index: number) => void;
}

const FileUploader = ({
  accept = "application/pdf,image/*,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  multiple = true,
  maxSize = 10, // 10MB default max size
  onFilesSelected,
  existingFiles = [],
  label = "Upload Documents",
  onFileDelete
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    processFiles(selectedFiles);
  };

  const processFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => {
      // Check file size
      const isValidSize = file.size <= maxSize * 1024 * 1024;
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the ${maxSize}MB limit.`,
          variant: "destructive"
        });
        return false;
      }
      
      // Check file type (if accept is specified)
      if (accept) {
        const acceptTypes = accept.split(',');
        const fileType = file.type;
        const isValidType = acceptTypes.some(type => {
          if (type.includes('*')) {
            return fileType.startsWith(type.split('*')[0]);
          }
          return type === fileType;
        });
        
        if (!isValidType) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not a supported file type.`,
            variant: "destructive"
          });
          return false;
        }
      }
      
      return true;
    });

    if (validFiles.length) {
      const newFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(newFiles);
      onFilesSelected(newFiles);
      
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} ${validFiles.length === 1 ? 'file' : 'files'} successfully added.`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    if (onFileDelete) {
      onFileDelete(index);
      return;
    }
    
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 transition-all duration-200
          flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="p-3 rounded-full bg-blue-100">
            <Upload className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="font-medium">{label}</p>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop your files, or <span className="text-blue-600 font-medium">browse</span>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Max {maxSize}MB per file • {accept.split(',').map(type => type.replace('application/', '').replace('image/', '')).join(', ')}
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Files</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {files.map((file, index) => (
              <Card key={`${file.name}-${index}`} className="flex items-center p-3 hover:shadow-md transition-shadow">
                <div className="p-2 rounded-md bg-blue-50 mr-3">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 truncate">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
