
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogClose 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { sanitizeFileName } from "@/utils/security";
import { validateEmail, validatePhone } from "@/utils/validation";

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
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File is too large. Maximum size is 5MB.");
        return;
      }
      
      // Validate file type by extension
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
        toast.error("Invalid file type. Only PDF, DOC, or DOCX files are allowed.");
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
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number";
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
    // For now, we'll just show a success toast and close the modal
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
  
  // Safely display the file name with proper sanitization using our security utility
  const safeDisplayFileName = (fileName: string): string => {
    // Use our sanitizeFileName utility from security.ts
    const sanitized = sanitizeFileName(fileName);
    return sanitized.length > 30 ? sanitized.substring(0, 27) + '...' : sanitized;
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
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              Full Name <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe" 
              required 
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              Email Address <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="john@example.com" 
              required 
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center">
              Phone Number <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
            </Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+1 (555) 123-4567" 
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-red-500 mt-1">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume" className="flex items-center">
              Resume <span className="text-indigo-600 ml-1" aria-hidden="true">*</span>
            </Label>
            <div className={`border-2 border-dashed ${errors.file ? 'border-red-500' : 'border-gray-300'} rounded-lg p-6 text-center`}>
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
            {errors.file && (
              <p className="text-sm text-red-500 mt-1">
                {errors.file}
              </p>
            )}
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
