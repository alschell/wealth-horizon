
import { useState } from "react";
import { useOnboarding, IdentityVerification } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import FileUploader from "@/components/FileUploader";

const IdentityVerificationForm = () => {
  const { onboardingData, updateIdentityVerification, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<IdentityVerification>(onboardingData.identityVerification);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (value: "passport" | "drivingLicense" | "nationalId") => {
    setFormData({ ...formData, documentType: value });
  };

  const handleFilesSelected = (files: File[]) => {
    setFormData({ ...formData, documentFiles: files });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof IdentityVerification)[] = ['documentType', 'documentNumber', 'issueDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please complete all required fields.`,
        variant: "destructive",
      });
      return;
    }
    
    if (formData.documentFiles.length === 0) {
      toast({
        title: "Missing documents",
        description: "Please upload your identification documents.",
        variant: "destructive",
      });
      return;
    }
    
    updateIdentityVerification(formData);
    setCurrentStep(3); // Move to data source step
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <Card className="p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Identity Verification</h2>
            <p className="text-gray-500">
              Please provide identification documents for KYC verification.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="documentType">Document Type<span className="text-red-500 ml-1">*</span></Label>
              <Select
                value={formData.documentType}
                onValueChange={(value: "passport" | "drivingLicense" | "nationalId") => 
                  handleSelectionChange(value)
                }
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivingLicense">Driving License</SelectItem>
                  <SelectItem value="nationalId">National ID</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <Label htmlFor="documentNumber">Document Number<span className="text-red-500 ml-1">*</span></Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="Document ID Number"
                  className="h-11"
                />
              </motion.div>

              <motion.div 
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="space-y-2"
              >
                <Label htmlFor="issueDate">Issue Date<span className="text-red-500 ml-1">*</span></Label>
                <Input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </motion.div>

              <motion.div 
                custom={3}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="col-span-1 md:col-span-2 space-y-2"
              >
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="h-11"
                />
              </motion.div>
            </div>

            <motion.div 
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              <Label>Document Upload<span className="text-red-500 ml-1">*</span></Label>
              <p className="text-sm text-gray-500 mb-2">
                Please upload scanned copies or high-quality photos of your identification document (front and back if applicable).
              </p>
              <FileUploader
                accept="application/pdf,image/*"
                multiple={true}
                maxSize={5}
                onFilesSelected={handleFilesSelected}
                existingFiles={formData.documentFiles}
                label="Upload Identification Documents"
              />
            </motion.div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with * are required.
            </p>
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                size="lg" 
                className="rounded-lg"
                onClick={() => setCurrentStep(1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="rounded-lg hover:shadow-md transition-shadow"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </motion.div>
  );
};

export default IdentityVerificationForm;
