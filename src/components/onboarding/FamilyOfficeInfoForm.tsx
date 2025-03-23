
import { useState } from "react";
import { useOnboarding, FamilyOfficeInfo } from "@/context/OnboardingContext";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import FormFieldItem from "./family-office/FormFieldItem";
import FormHeader from "./family-office/FormHeader";
import FormFooter from "./family-office/FormFooter";
import { validateFamilyOfficeInfo } from "./family-office/validationUtils";
import { LEGAL_ENTITY_TYPES, JURISDICTIONS } from "./constants/formOptions";

const FamilyOfficeInfoForm = () => {
  const { onboardingData, updateFamilyOfficeInfo, setCurrentStep } = useOnboarding();
  const [formData, setFormData] = useState<FamilyOfficeInfo>(onboardingData.familyOfficeInfo);

  const handleFieldChange = (name: keyof FamilyOfficeInfo, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (validateFamilyOfficeInfo(formData)) {
      updateFamilyOfficeInfo(formData);
      setCurrentStep(1); // Move to primary contact step
    }
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
          <FormHeader 
            title="Family Office Information"
            description="Please provide the details of your family office entity for KYC verification."
          />

          <div className="space-y-6">
            {/* Full width field */}
            <FormFieldItem
              index={0}
              label="Family Office Name"
              name="officeName"
              value={formData.officeName}
              onChange={handleFieldChange}
              placeholder="Smith Family Office LLC"
              required
              type="text"
            />
            
            {/* Two column layout for related fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldItem
                index={1}
                label="Legal Entity Type"
                name="legalEntityType"
                value={formData.legalEntityType}
                onChange={handleFieldChange}
                type="searchableSelect"
                options={LEGAL_ENTITY_TYPES}
                required
              />

              <FormFieldItem
                index={2}
                label="Jurisdiction"
                name="jurisdiction"
                value={formData.jurisdiction}
                onChange={handleFieldChange}
                type="searchableSelect"
                options={JURISDICTIONS}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldItem
                index={3}
                label="Registration Number"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleFieldChange}
                placeholder="e.g., LLC-12345678"
              />
              
              <FormFieldItem
                index={4}
                label="Tax ID Number"
                name="taxId"
                value={formData.taxId}
                onChange={handleFieldChange}
                placeholder="e.g., 12-3456789"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldItem
                index={5}
                label="Year Established"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleFieldChange}
                placeholder="e.g., 2015"
                type="number"
                minValue={1900}
                maxValue={new Date().getFullYear()}
              />
              
              <FormFieldItem
                index={6}
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder="office@smithfamilyoffice.com"
                type="email"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldItem
                index={7}
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                placeholder="+1 (555) 123-4567"
              />
              
              <FormFieldItem
                index={8}
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleFieldChange}
                placeholder="https://smithfamilyoffice.com"
              />
            </div>
          </div>

          <FormFooter onSubmit={handleSubmit} />
        </form>
      </Card>
    </motion.div>
  );
};

export default FamilyOfficeInfoForm;
