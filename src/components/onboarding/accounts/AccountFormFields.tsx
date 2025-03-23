
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUploader from "@/components/FileUploader";
import { INSTITUTIONS, CURRENCIES, ACCOUNT_TYPES } from "@/utils/financialDataConstants";

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
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer"
              id="institution"
            >
              {account.institution || "Select institution"}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search institution..." />
              <CommandEmpty>No institution found.</CommandEmpty>
              <CommandGroup>
                {INSTITUTIONS.map((institution) => (
                  <CommandItem
                    key={institution}
                    value={institution}
                    onSelect={() => onSelectionChange("institution", institution)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        account.institution === institution ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {institution}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="accountType">Account Type*</Label>
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer"
              id="accountType"
            >
              {account.accountType ? 
                account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1) 
                : "Select account type"}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search account type..." />
              <CommandEmpty>No account type found.</CommandEmpty>
              <CommandGroup>
                {ACCOUNT_TYPES.map((type) => (
                  <CommandItem
                    key={type}
                    value={type}
                    onSelect={() => onSelectionChange("accountType", type)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        account.accountType === type ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
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
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 cursor-pointer"
              id="currency"
            >
              {account.currency || "Select currency"}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search currency..." />
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {CURRENCIES.map((currency) => {
                  const code = currency.split(" - ")[0];
                  return (
                    <CommandItem
                      key={currency}
                      value={currency}
                      onSelect={() => onSelectionChange("currency", code)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          account.currency === code ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {currency}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
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
