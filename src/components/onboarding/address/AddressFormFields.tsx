
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { COUNTRIES, US_STATES } from "../constants/formOptions";
import { AddressInfo } from "@/context/OnboardingContext";

interface AddressFormFieldsProps {
  formData: AddressInfo;
  errors: Partial<Record<keyof AddressInfo, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof AddressInfo, value: string) => void;
}

const AddressFormFields: React.FC<AddressFormFieldsProps> = ({
  formData,
  errors,
  handleInputChange,
  handleSelectChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="streetAddress">
          Street Address<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress}
          onChange={handleInputChange}
          placeholder="123 Main Street, Apt 4B"
          className={`h-11 ${errors.streetAddress ? 'border-red-500' : ''}`}
        />
        {errors.streetAddress && (
          <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="New York"
            className={`h-11 ${errors.city ? 'border-red-500' : ''}`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <CustomSearchableSelect
          id="state"
          label="State/Province"
          value={formData.state}
          onChange={(value) => handleSelectChange('state', value)}
          placeholder="Select state"
          options={US_STATES.sort()}
          allowCustomValue={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode">
            Postal Code<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            placeholder="10001"
            className={`h-11 ${errors.postalCode ? 'border-red-500' : ''}`}
          />
          {errors.postalCode && (
            <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
          )}
        </div>

        <CustomSearchableSelect
          id="country"
          label="Country"
          value={formData.country}
          onChange={(value) => handleSelectChange('country', value)}
          placeholder="Select country"
          options={COUNTRIES.sort()}
          required
          className={errors.country ? 'error' : ''}
        />
      </div>
    </div>
  );
};

export default AddressFormFields;
