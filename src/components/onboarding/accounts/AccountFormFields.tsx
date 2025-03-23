
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUploader from "@/components/FileUploader";
import { INSTITUTIONS, CURRENCIES } from "@/utils/financialDataConstants";

interface AccountFormFieldsProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
  onStatementsSelected: (files: File[]) => void;
}

const AccountFormFields = ({
  account,
  onInputChange,
  onSelectionChange,
  onStatementsSelected
}: AccountFormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="accountName">Account Name*</Label>
        <Input
          id="accountName"
          name="accountName"
          value={account.accountName}
          onChange={onInputChange}
          placeholder="e.g., Main Investment Portfolio at UBS"
          className="h-11"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="institution">Institution*</Label>
        <Select
          value={account.institution}
          onValueChange={(value) => onSelectionChange("institution", value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select institution" />
          </SelectTrigger>
          <SelectContent>
            {INSTITUTIONS.map((institution) => (
              <SelectItem key={institution} value={institution}>
                {institution}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountType">Account Type*</Label>
        <Select
          value={account.accountType}
          onValueChange={(value) => onSelectionChange("accountType", value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash Account</SelectItem>
            <SelectItem value="portfolio">Investment Portfolio</SelectItem>
            <SelectItem value="custody">Custody Account</SelectItem>
            <SelectItem value="broker">Brokerage Account</SelectItem>
            <SelectItem value="investment">Investment Fund</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountSubtype">Account Subtype (optional)</Label>
        <Input
          id="accountSubtype"
          name="accountSubtype"
          value={account.accountSubtype || ""}
          onChange={onInputChange}
          placeholder="e.g., Managed Account, Private Equity"
          className="h-11"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="currency">Primary Currency</Label>
        <Select
          value={account.currency}
          onValueChange={(value) => onSelectionChange("currency", value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((currency) => (
              <SelectItem key={currency} value={currency.split(" - ")[0]}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="approximateValue">Approximate Value</Label>
        <Input
          id="approximateValue"
          name="approximateValue"
          value={account.approximateValue || ""}
          onChange={onInputChange}
          placeholder="e.g., 10,000,000"
          type="text"
          className="h-11"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label>Account Statements</Label>
        <FileUploader
          label="Upload account statements"
          onFilesSelected={onStatementsSelected}
          existingFiles={account.statements}
        />
      </div>
    </div>
  );
};

export default AccountFormFields;
