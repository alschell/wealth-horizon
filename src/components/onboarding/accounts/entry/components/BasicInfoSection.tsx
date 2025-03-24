
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomSelect } from "@/components/ui/custom-select";
import { ACCOUNT_TYPES } from "@/utils/constants/accountTypes";
import { INSTITUTIONS } from "@/utils/constants/institutions";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";

interface BasicInfoSectionProps {
  account: FinancialAccountInfo;
  errors?: Record<string, string>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const BasicInfoSection = ({
  account,
  errors = {},
  onInputChange,
  onSelectionChange
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="accountName" className="flex items-center">
            Account Name
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="accountName"
            name="accountName"
            value={account.accountName || ""}
            onChange={onInputChange}
            placeholder="Enter account name"
            className={`h-11 ${errors.accountName ? 'border-red-500' : ''}`}
          />
          {errors.accountName && (
            <p className="text-red-500 text-sm mt-1">{errors.accountName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="accountType" className="flex items-center">
            Account Type
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <CustomSelect
            id="accountType"
            label=""
            value={account.accountType || ""}
            onChange={(value) => onSelectionChange('accountType', value)}
            placeholder="Select account type"
            options={ACCOUNT_TYPES}
            className={`h-11 ${errors.accountType ? 'border-red-500' : ''}`}
          />
          {errors.accountType && (
            <p className="text-red-500 text-sm mt-1">{errors.accountType}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
