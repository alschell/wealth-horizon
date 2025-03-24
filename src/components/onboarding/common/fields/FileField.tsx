
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

interface FileFieldProps {
  id: string;
  label: string;
  accept?: string;
  multiple?: boolean;
  existingFiles?: File[];
  onFilesSelected: (files: File[]) => void;
  maxSize?: number; // in MB
  required?: boolean;
  className?: string;
}

const FileField = ({
  id,
  label,
  accept = "application/pdf",
  multiple = false,
  existingFiles = [],
  onFilesSelected,
  maxSize = 10, // Default 10MB
  required = false,
  className
}: FileFieldProps) => {
  const [files, setFiles] = useState<File[]>(existingFiles);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Check file size
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSize}MB.`,
        variant: "destructive"
      });
      return;
    }
    
    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };
  
  const handleDeleteClick = (index: number) => {
    setFileToDelete(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete !== null) {
      const newFiles = [...files];
      newFiles.splice(fileToDelete, 1);
      setFiles(newFiles);
      onFilesSelected(newFiles);
      setFileToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className={className}>
      <Label htmlFor={id} className="block mb-2">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full h-20 flex flex-col items-center justify-center gap-1 border-dashed"
            onClick={() => document.getElementById(id)?.click()}
          >
            <Upload className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {multiple 
                ? "Click to upload files" 
                : files.length > 0 
                  ? "Replace current file" 
                  : "Click to upload a file"
              }
            </span>
            <span className="text-xs text-gray-500">
              Max size: {maxSize}MB
            </span>
          </Button>
          
          <input
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm File Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FileField;
