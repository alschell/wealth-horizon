
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
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleSubmitResume = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the resume file, name, and email to a server
    // For now, we'll just show a success toast and close the modal
    toast.success("Your resume has been submitted! We'll be in touch soon.");
    onOpenChange(false);
    setResumeFile(null);
    setName("");
    setEmail("");
    setPhone("");
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
        <form onSubmit={handleSubmitResume} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              Full Name <span className="text-indigo-600 ml-1">*</span>
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              Email Address <span className="text-indigo-600 ml-1">*</span>
            </Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="john@example.com" 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center">
              Phone Number <span className="text-indigo-600 ml-1">*</span>
            </Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+1 (555) 123-4567" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="resume" className="flex items-center">
              Resume <span className="text-indigo-600 ml-1">*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {resumeFile ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{resumeFile.name}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setResumeFile(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
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
                    />
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX up to 5MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={!resumeFile || !name || !email || !phone}>Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
