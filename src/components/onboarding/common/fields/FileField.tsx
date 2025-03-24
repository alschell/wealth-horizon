
import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileType } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DeleteConfirmationDialog from "@/components/file-uploader/DeleteConfirmationDialog";
import { DeleteButton } from "@/components/ui/action-buttons";

export interface FileFieldProps {
  id: string;
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  hint?: string;
  error?: string;
  onFilesChange?: (files: File[]) => void;
}

const FileField: React.FC<FileFieldProps> = ({
  id,
  label,
  required = false,
  accept,
  multiple = false,
  hint,
  error,
  onFilesChange
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileToDeleteIndex, setFileToDeleteIndex] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = multiple ? [...selectedFiles, ...newFiles] : newFiles;
      setSelectedFiles(updatedFiles);
      
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
    }
  };

  const handleRemoveFileClick = (index: number) => {
    setFileToDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDeleteIndex !== null) {
      const updatedFiles = selectedFiles.filter((_, i) => i !== fileToDeleteIndex);
      setSelectedFiles(updatedFiles);
      
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
    }
    setIsDeleteDialogOpen(false);
    setFileToDeleteIndex(null);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-black">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors 
          ${selectedFiles.length ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input
          id={id}
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept={accept}
          multiple={multiple}
        />
        
        {selectedFiles.length === 0 ? (
          <div 
            onClick={triggerFileInput}
            className="cursor-pointer py-4"
          >
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Drag and drop or <span className="text-blue-600 font-medium">browse files</span>
            </p>
            {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between bg-white p-2 rounded border text-left"
                >
                  <div className="flex items-center space-x-2 overflow-hidden flex-grow mr-2">
                    <FileType className="h-5 w-5 text-blue-500 shrink-0" />
                    <span className="text-sm truncate max-w-[180px] md:max-w-xs">
                      {file.name}
                    </span>
                  </div>
                  <div className="shrink-0">
                    <DeleteButton 
                      onClick={() => handleRemoveFileClick(index)}
                      size="icon"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={triggerFileInput}
              className="text-xs"
            >
              {multiple ? "Add More Files" : "Replace File"}
            </Button>
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <DeleteConfirmationDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Confirm File Deletion"
        description="Are you sure you want to delete this file? This action cannot be undone."
      />
    </div>
  );
};

export default FileField;
