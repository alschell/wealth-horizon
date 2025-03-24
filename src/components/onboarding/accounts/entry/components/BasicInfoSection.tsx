
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { INSTITUTIONS } from "../constants";
import { ACCOUNT_TYPES } from "@/utils/constants";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  errors?: Record<string, string>;
}

const BasicInfoSection = ({
  account,
  onInputChange,
  onSelectionChange,
  errors = {}
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-black">Entity Details</h3>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="accountName">
          Account Name<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="accountName"
          name="accountName"
          value={account.accountName}
          onChange={onInputChange}
          placeholder="e.g., Main Investment Portfolio at UBS"
          className={`h-11 ${errors.accountName ? 'border-red-500' : ''}`}
        />
        {errors.accountName && (
          <p className="text-xs text-red-500 mt-1">{errors.accountName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSearchableSelect
          id="institution"
          label="Institution"
          value={account.institution || ""}
          onChange={(value) => onSelectionChange('institution', value)}
          placeholder="Select institution"
          options={INSTITUTIONS}
          allowCustomValue={true}
          required={true}
        />
        
        <CustomSearchableSelect
          id="accountType"
          label="Account Type"
          value={account.accountType || ""}
          onChange={(value) => onSelectionChange('accountType', value)}
          placeholder="Select account type"
          options={ACCOUNT_TYPES}
          required={true}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
