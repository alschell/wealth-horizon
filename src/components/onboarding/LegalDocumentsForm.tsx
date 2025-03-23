
import React, { useState } from "react";
import { useOnboarding, LegalDocuments } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ScrollText } from "lucide-react";
import { CustomSelect } from "@/components/ui/custom-select";
import { DOCUMENT_TYPES } from "./constants/formOptions";
import FileUploader from "@/components/FileUploader";

type DocumentType = "incorporation" | "registration" | "taxCertificate" | "ownership" | "other";

const LegalDocumentsForm = () => {
  const { onboardingData, updateLegalDocuments, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<LegalDocuments>(onboardingData.legalDocuments);
  const [errors, setErrors] = useState<Partial<Record<keyof LegalDocuments, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof LegalDocuments]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleDocumentTypeChange = (value: string) => {
    setFormData({ 
      ...formData, 
      documentType: value as DocumentType 
    });
    
    // Clear error when field is edited
    if (errors.documentType) {
      setErrors({ ...errors, documentType: undefined });
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setFormData({ ...formData, documentFiles: files });
    
    // Clear error when field is edited
    if (errors.documentFiles) {
      setErrors({ ...errors, documentFiles: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof LegalDocuments, string>> = {};
    const requiredFields: (keyof LegalDocuments)[] = [
      'documentType', 
      'documentNumber', 
      'issueDate'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (formData.documentFiles.length === 0) {
      newErrors.documentFiles = 'Please upload at least one document';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    updateLegalDocuments(formData);
    setCurrentStep(4); // Move to data source step
    
    toast({
      title: "Information saved",
      description: "Legal documents have been saved successfully.",
    });
  };

  // Extract document type labels for the select component
  const documentTypeOptions = DOCUMENT_TYPES.map(doc => doc.label);
  
  // Map the label to the value when selecting an option
  const getDocumentTypeValue = (label: string) => {
    const docType = DOCUMENT_TYPES.find(doc => doc.label === label);
    return docType ? docType.value as DocumentType : "other";
  };
  
  // Map the value to the label for display
  const getDocumentTypeLabel = (value: string) => {
    const docType = DOCUMENT_TYPES.find(doc => doc.value === value);
    return docType ? docType.label : "";
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

          <div className="space-y-6">
            <CustomSelect
              id="documentType"
              label="Document Type"
              value={getDocumentTypeLabel(formData.documentType)}
              onChange={(label) => handleDocumentTypeChange(getDocumentTypeValue(label))}
              placeholder="Select document type"
              options={documentTypeOptions}
              required
              className={errors.documentType ? 'error' : ''}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="documentNumber">
                  Document Number<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleInputChange}
                  placeholder="Document identification number"
                  className={`h-11 ${errors.documentNumber ? 'border-red-500' : ''}`}
                />
                {errors.documentNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="issueDate">
                  Issue Date<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  className={`h-11 ${errors.issueDate ? 'border-red-500' : ''}`}
                />
                {errors.issueDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.issueDate}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDate">
                Expiry Date (if applicable)
              </Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate || ""}
                onChange={handleInputChange}
                className="h-11"
              />
            </div>

            <div className="space-y-3">
              <Label>
                Document Upload<span className="text-red-500 ml-1">*</span>
              </Label>
              <FileUploader
                accept="application/pdf,image/*"
                multiple={true}
                maxSize={5}
                onFilesSelected={handleFilesSelected}
                existingFiles={formData.documentFiles}
                label="Upload Legal Documents"
              />
              {errors.documentFiles && (
                <p className="text-red-500 text-sm mt-1">{errors.documentFiles}</p>
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-6">
              Fields marked with <span className="text-red-500">*</span> are required.
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
                className="rounded-lg hover:shadow-md transition-shadow bg-blue-600 hover:bg-blue-700 text-white"
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
