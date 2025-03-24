
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { INSTITUTIONS, ACCOUNT_TYPES } from "@/utils/constants";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  errors: Partial<Record<keyof FinancialAccountInfo, string>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection = ({
  account,
  errors,
  onInputChange,
  onSelectionChange
}: BasicInfoSectionProps) => {
  return (
    <>
      <div className="space-y-2">
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
          <p className="text-red-500 text-sm mt-1">{errors.accountName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSearchableSelect
          id="institution"
          label="Institution"
          value={account.institution}
          onChange={(value) => onSelectionChange('institution', value)}
          placeholder="Select institution"
          options={INSTITUTIONS.sort()}
          required
          className={errors.institution ? 'error' : ''}
          allowCustomValue={true}
        />
        
        <CustomSearchableSelect
          id="accountType"
          label="Account Type"
          value={account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)}
          onChange={(value) => onSelectionChange('accountType', value.toLowerCase() as any)}
          placeholder="Select account type"
          options={ACCOUNT_TYPES.sort()}
          required
          className={errors.accountType ? 'error' : ''}
        />
      </div>
    </>
  );
};

export default BasicInfoSection;
