
import React from "react";
import { InputField } from "@/components/onboarding/common/fields";
import { PrimaryContactInfo } from "@/context/OnboardingContext";

interface PrimaryContactFormFieldsProps {
  formData: PrimaryContactInfo;
  errors: Partial<Record<keyof PrimaryContactInfo, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PrimaryContactFormFields: React.FC<PrimaryContactFormFieldsProps> = ({
  formData,
  errors,
  handleInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="John"
          required
          error={errors.firstName}
        />

        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Smith"
          required
          error={errors.lastName}
        />
      </div>

      <InputField
        id="position"
        name="position"
        label="Position/Title"
        value={formData.position}
        onChange={handleInputChange}
        placeholder="e.g., Chief Investment Officer"
        required
        error={errors.position}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john.smith@example.com"
          required
          error={errors.email}
        />

        <InputField
          id="phone"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="+1 (555) 123-4567"
          required
          error={errors.phone}
        />
      </div>
    </div>
  );
};

export default PrimaryContactFormFields;
