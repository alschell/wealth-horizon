
import React from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanitizeFileName } from "@/utils/security";

interface ResumeFileUploadProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  error?: string;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ResumeFileUpload: React.FC<ResumeFileUploadProps> = ({
  resumeFile,
  setResumeFile,
  error,
  handleFileChange
}) => {
  // Safely display the file name with proper sanitization
  const safeDisplayFileName = (fileName: string): string => {
    const sanitized = sanitizeFileName(fileName);
    return sanitized.length > 30 ? sanitized.substring(0, 27) + '...' : sanitized;
  };

  return (
    <div className="space-y-2">
      <div className={`border-2 border-dashed ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center`}>
        {resumeFile ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{safeDisplayFileName(resumeFile.name)}</span>
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
                accept=".pdf,.doc,.docx"
                className="sr-only"
                onChange={handleFileChange}
                required
                aria-required="true"
                aria-describedby="file-format-help"
              />
              <p id="file-format-help" className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX up to 5MB</p>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};
