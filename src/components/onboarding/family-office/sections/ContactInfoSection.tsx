
import React from "react";
import { FamilyOfficeInfo } from "@/context/OnboardingContext";
import FormFieldItem from "../FormFieldItem";

interface ContactInfoSectionProps {
  formData: FamilyOfficeInfo;
  onChange: (name: string, value: string) => void;
  errors: Partial<Record<keyof FamilyOfficeInfo, string>>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  formData,
  onChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormFieldItem
          index={6}
          label="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="office@example.com"
          type="email"
          required={true}
          className={errors.email ? 'error' : ''}
        />
        
        <FormFieldItem
          index={7}
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          placeholder="+1 (555) 123-4567"
        />
        
        <FormFieldItem
          index={8}
          label="Website"
          name="website"
          value={formData.website}
          onChange={onChange}
          placeholder="https://www.example.com"
        />
      </div>
    </div>
  );
};

export default ContactInfoSection;
