
import React from "react";
import { AddressInfo } from "@/types/onboarding";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { COUNTRIES } from "../constants";

interface AddressFormFieldsProps {
  address: AddressInfo;
  errors?: Partial<Record<keyof AddressInfo, string>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof AddressInfo, value: string) => void;
}

const AddressFormFields = ({
  address,
  errors = {},
  onInputChange,
  onSelectionChange
}: AddressFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="streetAddress">
            Address Line 1
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            value={address.streetAddress || ""}
            onChange={onInputChange}
            placeholder="e.g., 123 Main St"
            className="h-11"
          />
          {errors.streetAddress && (
            <p className="text-sm text-red-500">{errors.streetAddress}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2">
            Address Line 2
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            value={address.addressLine2 || ""}
            onChange={onInputChange}
            placeholder="e.g., Apt 4B"
            className="h-11"
          />
          {errors.addressLine2 && (
            <p className="text-sm text-red-500">{errors.addressLine2}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="city"
            name="city"
            value={address.city || ""}
            onChange={onInputChange}
            placeholder="e.g., New York"
            className="h-11"
          />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">
            Region/State
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="state"
            name="state"
            value={address.state || ""}
            onChange={onInputChange}
            placeholder="e.g., NY"
            className="h-11"
          />
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">
            Postal Code
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={address.postalCode || ""}
            onChange={onInputChange}
            placeholder="e.g., 10001"
            className="h-11"
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <CustomSearchableSelect
          id="country"
          label="Country"
          value={address.country}
          onChange={(value) => onSelectionChange('country', value)}
          placeholder="Select country"
          options={COUNTRIES}
          required={true}
        />
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country}</p>
        )}
      </div>
    </>
  );
};

export default AddressFormFields;
