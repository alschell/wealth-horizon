
import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanitizeFileName } from "@/utils/security";

interface ResumeFileUploadProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  error?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allowedFileTypes?: string[];
  maxFileSizeMB?: number;
}

export const ResumeFileUpload: React.FC<ResumeFileUploadProps> = ({
  resumeFile,
  setResumeFile,
  error,
  handleFileChange,
  allowedFileTypes = [".pdf", ".doc", ".docx"],
  maxFileSizeMB = 5
}) => {
  // Safely display the file name with proper sanitization
  const safeDisplayFileName = (fileName: string): string => {
    const sanitized = sanitizeFileName(fileName);
    return sanitized.length > 30 ? sanitized.substring(0, 27) + '...' : sanitized;
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="space-y-2">
      <div 
        className={`border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center`}
        role="region"
        aria-label="Resume file upload"
      >
        {resumeFile ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="text-sm text-gray-600 truncate max-w-[80%]" title={resumeFile.name}>
                {safeDisplayFileName(resumeFile.name)}
              </span>
              <span className="text-xs text-gray-500">
                ({formatFileSize(resumeFile.size)})
              </span>
            </div>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={() => setResumeFile(null)}
              aria-label="Remove file"
            >
              <X size={16} />
            </Button>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
            <div className="mt-2">
              <label htmlFor="resume-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-700">
                Upload a file
              </label>
              <input
                id="resume-upload"
                name="resume"
                type="file"
                accept={allowedFileTypes.join(',')}
                className="sr-only"
                onChange={handleFileChange}
                required
                aria-required="true"
                aria-describedby="file-format-help"
              />
              <p id="file-format-help" className="text-xs text-gray-500 mt-1">
                {allowedFileTypes.join(', ')} up to {maxFileSizeMB}MB
              </p>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
