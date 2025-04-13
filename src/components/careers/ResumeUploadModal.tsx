
import React, { useState } from "react";
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
import { validateEmail, validatePhone, validateFileSize, validateFileType } from "@/utils/validation";
import { FormField } from "./form/FormFields";
import { ResumeFileUpload } from "./form/ResumeFileUpload";

// Constants for file validation
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['.pdf', '.doc', '.docx'];
const ALLOWED_MIME_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

interface ResumeUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Validate file before accepting it
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size
      const sizeError = validateFileSize(file, 5);
      if (sizeError) {
        toast.error(sizeError);
        return;
      }
      
      // Validate file type by extension
      const typeError = validateFileType(file, ALLOWED_FILE_TYPES);
      if (typeError) {
        toast.error(typeError);
        return;
      }
      
      // Also validate by MIME type for better security
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        toast.error("Invalid file format. Please upload a valid document.");
        return;
      }
      
      setResumeFile(file);
      setErrors(prev => ({ ...prev, file: "" }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailError = validateEmail(email);
      if (emailError) newErrors.email = emailError;
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneError = validatePhone(phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    
    if (!resumeFile) {
      newErrors.file = "Resume file is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmitResume = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // In a real app, this would send the resume file, name, and email to a server
    toast.success("Your resume has been submitted! We'll be in touch soon.");
    onOpenChange(false);
    resetForm();
  };
  
  const resetForm = () => {
    setResumeFile(null);
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
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
        <form onSubmit={handleSubmitResume} className="space-y-4" aria-labelledby="resume-form-title">
          <FormField
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
            placeholder="John Doe"
            error={errors.name}
          />
          
          <FormField
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            error={errors.email}
          />
          
          <FormField
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            error={errors.phone}
          />
          
          <div className="space-y-2">
            <label htmlFor="resume" className="flex items-center block text-gray-700">
              Resume <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
            </label>
            <ResumeFileUpload 
              resumeFile={resumeFile}
              setResumeFile={setResumeFile}
              error={errors.file}
              handleFileChange={handleFileChange}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={!name || !email || !phone || !resumeFile}
              aria-disabled={!name || !email || !phone || !resumeFile}
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
