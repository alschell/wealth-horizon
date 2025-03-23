
import { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, FileText, ScrollText } from "lucide-react";
import FileUploader from "@/components/FileUploader";

const LegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<LegalDocuments>(onboardingData.legalDocuments);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectionChange = (value: "incorporation" | "registration" | "taxCertificate" | "ownership" | "other") => {
    setFormData({ ...formData, documentType: value });
  };

  const handleFilesSelected = (files: File[]) => {
    setFormData({ ...formData, documentFiles: files });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const requiredFields: (keyof LegalDocuments)[] = ['documentType', 'documentNumber', 'issueDate'];
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
        description: "Please upload your legal documents.",
        variant: "destructive",
      });
      return;
    }
    
    updateLegalDocuments(formData);
    setCurrentStep(4); // Move to data source step
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
          <div className="flex items-center gap-3 mb-2">
            <ScrollText className="h-7 w-7 text-blue-600" />
            <h2 className="text-2xl font-bold">Legal Documents</h2>
          </div>
          <p className="text-gray-500">
            Please upload the legal documentation for your family office entity.
          </p>

          <div className="grid grid-cols-1 gap-6">
            <motion.div 
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              <Label htmlFor="documentType">Document Type*</Label>
              <Select
                value={formData.documentType}
                onValueChange={(value: "incorporation" | "registration" | "taxCertificate" | "ownership" | "other") => 
                  handleSelectionChange(value)
                }
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incorporation">Certificate of Incorporation</SelectItem>
                  <SelectItem value="registration">Business Registration</SelectItem>
                  <SelectItem value="taxCertificate">Tax Certificate</SelectItem>
                  <SelectItem value="ownership">Ownership Structure</SelectItem>
                  <SelectItem value="other">Other Legal Document</SelectItem>
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
                <Label htmlFor="documentNumber">Document Number*</Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="Document ID or Reference"
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
                <Label htmlFor="issueDate">Issue Date*</Label>
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
                className="space-y-2"
              >
                <Label htmlFor="expiryDate">Expiry Date (if applicable)</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate || ""}
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
              <Label>Document Upload*</Label>
              <p className="text-sm text-gray-500 mb-2">
                Please upload scanned copies or PDF files of your legal documents. Include any corporate structure diagrams or ownership charts if available.
              </p>
              <FileUploader
                accept="application/pdf,image/*"
                multiple={true}
                maxSize={10}
                onFilesSelected={handleFilesSelected}
                existingFiles={formData.documentFiles}
                label="Upload Legal Documents"
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
                onClick={() => setCurrentStep(2)}
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

export default LegalDocumentsForm;
