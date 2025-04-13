
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { validateEmail, validatePhone, validateRequired } from "@/utils/validation";
import { FormField } from "./form/FormFields";
import { ResumeFileUpload } from "./form/ResumeFileUpload";
import { sanitizeFileName } from "@/utils/security";
import { useStandardForm } from "@/hooks/useStandardForm";
import { announceToScreenReader } from "@/utils/a11y";

// Constants for file validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

interface ResumeUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ResumeFormData {
  name: string;
  email: string;
  phone: string;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  
  // Define validation rules
  const validationRules = {
    name: (value: string) => validateRequired(value, 'Name'),
    email: validateEmail,
    phone: validatePhone
  };
  
  // Use the standardized form hook
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSuccess,
    resetForm
  } = useStandardForm<ResumeFormData>({
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validationRules,
    onSubmit: async (data) => {
      // Validate file presence
      if (!resumeFile) {
        setFileError("Resume file is required");
        throw new Error("Resume file is required");
      }
      
      // In a real app, this would send the resume file, name, and email to a server
      // Simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success handling is done by the hook
    },
    onSuccess: () => {
      toast.success("Your resume has been submitted! We'll be in touch soon.");
      onOpenChange(false);
      resetForm();
      setResumeFile(null);
      setFileError(null);
      announceToScreenReader("Resume submitted successfully", "polite");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "An error occurred. Please try again.");
      announceToScreenReader("Error submitting resume. Please check the form for errors.", "assertive");
    }
  });
  
  // Reset file error when resumeFile changes
  useEffect(() => {
    if (resumeFile) {
      setFileError(null);
    }
  }, [resumeFile]);
  
  // Validate file before accepting it
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Sanitize filename
      const sanitizedName = sanitizeFileName(file.name);
      console.log(`File name sanitized: ${file.name} → ${sanitizedName}`);
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File size exceeds the maximum allowed size of 5MB`);
        toast.error(`File size exceeds the maximum allowed size of 5MB`);
        return;
      }
      
      // Validate file extension
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
        setFileError(`Invalid file type. Allowed types: ${ALLOWED_FILE_TYPES.join(', ')}`);
        toast.error(`Invalid file type. Allowed types: PDF, DOC, DOCX`);
        return;
      }
      
      // Validate MIME type for better security
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setFileError(`Invalid file format. Please upload a valid document.`);
        toast.error(`Invalid file format. Please upload a valid document.`);
        return;
      }
      
      setResumeFile(file);
      setFileError(null);
    }
  };
  
  const handleCloseDialog = () => {
    resetForm();
    setResumeFile(null);
    setFileError(null);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Your Resume</DialogTitle>
          <DialogDescription>
            Let us know about your skills and experience. We'll reach out if there's a good fit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" aria-labelledby="resume-form-title">
          <FormField
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Full Name"
            placeholder="John Doe"
            error={errors.name}
            autoComplete="name"
            required
          />
          
          <FormField
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            label="Email Address"
            placeholder="john@example.com"
            error={errors.email}
            autoComplete="email"
            required
          />
          
          <FormField
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            error={errors.phone}
            autoComplete="tel"
            required
          />
          
          <div className="space-y-2">
            <label htmlFor="resume" className="flex items-center block text-gray-700">
              Resume <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
            </label>
            <ResumeFileUpload 
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              error={fileError}
              handleFileChange={handleFileChange}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !resumeFile}
              aria-disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !resumeFile}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
