import React from "react";
import { AddressInfo } from "@/types/onboarding";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { COUNTRIES } from "../constants";

interface AddressFormFieldsProps {
  address: AddressInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof AddressInfo, value: string) => void;
}

const AddressFormFields = ({
  address,
  onInputChange,
  onSelectionChange
}: AddressFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="addressLine1">
            Address Line 1
          </Label>
          <Input
            id="addressLine1"
            name="addressLine1"
            value={address.addressLine1 || ""}
            onChange={onInputChange}
            placeholder="e.g., 123 Main St"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2">
            Address Line 2 (optional)
          </Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            value={address.addressLine2 || ""}
            onChange={onInputChange}
            placeholder="e.g., Apt 4B"
            className="h-11"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City
          </Label>
          <Input
            id="city"
            name="city"
            value={address.city || ""}
            onChange={onInputChange}
            placeholder="e.g., New York"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">
            Region/State
          </Label>
          <Input
            id="region"
            name="region"
            value={address.region || ""}
            onChange={onInputChange}
            placeholder="e.g., NY"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postalCode">
            Postal Code
          </Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={address.postalCode || ""}
            onChange={onInputChange}
            placeholder="e.g., 10001"
            className="h-11"
          />
        </div>
      </div>

      <CustomSearchableSelect
        id="country"
        label="Country"
        value={address.country}
        onChange={(value) => onSelectionChange('country', value)}
        placeholder="Select country"
        options={COUNTRIES}
        className=""
      />
    </>
  );
};

export default AddressFormFields;
