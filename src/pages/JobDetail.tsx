
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTemplate from "@/components/shared/PageTemplate";
import { Briefcase, ArrowLeft, Building, MapPin, Clock, FileText, CheckCircle, Calendar, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  
  const { job } = location.state || { 
    job: {
      id: 1,
      title: "Position",
      department: "Department",
      location: "Location",
      type: "Full-time"
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };
  
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the application data to a server
    // For now, we'll just show a success toast and close the modal
    toast.success("Your application has been submitted successfully! We'll be in touch soon.");
    setIsApplyModalOpen(false);
    setResumeFile(null);
    setName("");
    setEmail("");
    setPhone("");
    setCoverLetter("");
  };

  return (
    <PageTemplate
      title={job.title}
      description={`Join the WealthHorizon team as a ${job.title}`}
      icon={Briefcase}
    >
      <Button 
        variant="outline" 
        className="mb-6 flex items-center"
        onClick={() => navigate("/careers")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Careers
      </Button>

      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{job.title}</h2>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Building className="h-4 w-4 mr-1" />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{job.type}</span>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto" onClick={handleApply}>
            Apply for this Position
          </Button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">About the Role</h3>
            <p className="text-gray-600">
              We're looking for a talented {job.title} to join our {job.department} team. In this role, you'll be responsible for designing, implementing, and maintaining critical solutions that help our customers manage their wealth more effectively. You'll work closely with cross-functional teams to deliver high-quality, scalable systems that meet our clients' complex needs.
            </p>
          </section>
          
          <Separator />
          
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Responsibilities</h3>
            <ul className="space-y-2">
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Collaborate with product managers, designers, and fellow engineers to build innovative solutions</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Write well-designed, testable, and efficient code following best practices</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Participate in code reviews and contribute to technical documentation</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Troubleshoot, debug, and upgrade existing systems</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Stay up-to-date with emerging trends and technologies</span>
              </li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h3>
            <ul className="space-y-2">
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>3+ years of experience in a similar role</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Bachelor's degree in Computer Science, Engineering, or related field</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Proficiency in relevant technologies and programming languages</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Strong problem-solving skills and attention to detail</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Excellent communication and teamwork abilities</span>
              </li>
            </ul>
          </section>
          
          <Separator />
          
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits</h3>
            <ul className="space-y-2">
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Competitive salary and equity package</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Comprehensive health, dental, and vision insurance</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Flexible work arrangements</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Professional development budget</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Generous paid time off</span>
              </li>
            </ul>
          </section>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Application Timeline</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Our hiring process typically takes 3-4 weeks from application to offer. We'll keep you updated throughout the process.
          </p>
          <Button className="w-full sm:w-auto" onClick={handleApply}>
            Apply Now
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={() => navigate("/careers")}>
            View All Positions
          </Button>
          <Button variant="outline" onClick={() => window.open('/help-center', '_blank')}>
            FAQs
          </Button>
        </div>
      </div>

      {/* Job Application Modal */}
      <Dialog open={isApplyModalOpen} onOpenChange={setIsApplyModalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-xl">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Complete the form below to apply for this position. We'll review your application and get back to you soon.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+1 (555) 123-4567" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
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
            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
              <Textarea 
                id="coverLetter" 
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell us why you're interested in this position and what makes you a great fit."
                rows={5}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={!resumeFile || !name || !email}>Submit Application</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default JobDetail;
