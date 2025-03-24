
import React, { useState } from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Plus, Wallet } from "lucide-react";
import { CustomSearchableSelect } from "@/components/ui/custom-searchable-select";
import { INSTITUTIONS, ACCOUNT_TYPES, CURRENCIES } from "@/utils/financialDataConstants";
import FileUploader from "@/components/FileUploader";

// Define legal entities for institutions (mapping)
const LEGAL_ENTITIES = {
  "JP Morgan Chase": [
    "JPMORGAN CHASE BANK, N.A. NEW YORK",
    "JP MORGAN SECURITIES LLC",
    "J.P. MORGAN SECURITIES PLC",
    "JPMORGAN ASSET MANAGEMENT (UK) LIMITED"
  ],
  "Goldman Sachs": [
    "GOLDMAN SACHS BANK USA",
    "GOLDMAN SACHS & CO. LLC",
    "GOLDMAN SACHS INTERNATIONAL",
    "GOLDMAN SACHS ASSET MANAGEMENT, L.P."
  ],
  "Morgan Stanley": [
    "MORGAN STANLEY BANK, N.A.",
    "MORGAN STANLEY & CO. LLC",
    "MORGAN STANLEY SMITH BARNEY LLC",
    "MORGAN STANLEY INVESTMENT MANAGEMENT INC."
  ],
  "Bank of America": [
    "BANK OF AMERICA, N.A.",
    "MERRILL LYNCH, PIERCE, FENNER & SMITH INCORPORATED",
    "BofA SECURITIES, INC.",
    "BANK OF AMERICA EUROPE DESIGNATED ACTIVITY COMPANY"
  ],
  "Wells Fargo": [
    "WELLS FARGO BANK, N.A.",
    "WELLS FARGO SECURITIES, LLC",
    "WELLS FARGO CLEARING SERVICES, LLC",
    "WELLS FARGO FUNDS MANAGEMENT, LLC"
  ],
  "Citigroup": [
    "CITIBANK, N.A.",
    "CITIGROUP GLOBAL MARKETS INC.",
    "CITIGROUP GLOBAL MARKETS LIMITED",
    "CITIGROUP GLOBAL MARKETS EUROPE AG"
  ],
  "UBS": [
    "UBS AG",
    "UBS FINANCIAL SERVICES INC.",
    "UBS SECURITIES LLC",
    "UBS ASSET MANAGEMENT (AMERICAS) INC."
  ],
  "Credit Suisse": [
    "CREDIT SUISSE AG",
    "CREDIT SUISSE SECURITIES (USA) LLC",
    "CREDIT SUISSE INTERNATIONAL",
    "CREDIT SUISSE ASSET MANAGEMENT, LLC"
  ]
};

// Legal Entity Identifier mapping
const LEI_MAPPING = {
  "JPMORGAN CHASE BANK, N.A. NEW YORK": "7H6GLXDRUGQFU57RNE97",
  "JP MORGAN SECURITIES LLC": "ZBUT11V806EZRVTWT807",
  "J.P. MORGAN SECURITIES PLC": "K6Q0W1PS1L1O4IQL9C32",
  "GOLDMAN SACHS BANK USA": "KD3XUN7C6T14HNAYLU76",
  "GOLDMAN SACHS & CO. LLC": "FOR8UP27PHTHYVLBNG30",
  "GOLDMAN SACHS INTERNATIONAL": "W22LROWP2IHZNBB6K528",
  "MORGAN STANLEY BANK, N.A.": "IGJSJL3JD5P30I6NJZ34",
  "MORGAN STANLEY & CO. LLC": "9R7GPTSO7KV3UQJZQ078",
  "MORGAN STANLEY SMITH BARNEY LLC": "9ZSB5FLPO3FTM154YP34",
  "BANK OF AMERICA, N.A.": "B4TYDEB6GKMZO031MB27",
  "MERRILL LYNCH, PIERCE, FENNER & SMITH INCORPORATED": "8NAV47T0Y26Q178XCGN7",
  "WELLS FARGO BANK, N.A.": "PBLD0EJDB5FWOLXP3B76",
  "CITIBANK, N.A.": "E57ODZWZ7FF32TWEFA76",
  "UBS AG": "BFM8T61CT2L1QCEMIK50",
  "CREDIT SUISSE AG": "ANGGYXNX0JLX3X63JN86"
};

interface AccountFormProps {
  onAddAccount: (account: FinancialAccountInfo) => void;
  enableLegalEntityFields?: boolean;
}

const AccountForm = ({ onAddAccount, enableLegalEntityFields = false }: AccountFormProps) => {
  const [newAccount, setNewAccount] = useState<FinancialAccountInfo>({
    accountName: "",
    institution: "",
    accountType: "cash",
    accountSubtype: "",
    currency: "",
    approximateValue: "",
    statements: []
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FinancialAccountInfo, string>>>({});

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount({ ...newAccount, [name]: value });
    
    // Clear error when field is edited
    if (errors[name as keyof FinancialAccountInfo]) {
      setErrors({ ...errors, [name]: undefined });
    }
    
    // If this is the legal entity identifier field, try to populate institution and legal entity
    if (name === "legalEntityIdentifier" && value) {
      for (const [entityName, entityLei] of Object.entries(LEI_MAPPING)) {
        if (entityLei === value) {
          // Find the institution this entity belongs to
          for (const [instName, entities] of Object.entries(LEGAL_ENTITIES)) {
            if ((entities as string[]).includes(entityName)) {
              setNewAccount(prev => ({
                ...prev,
                institution: instName,
                legalEntity: entityName,
                legalEntityIdentifier: value
              }));
              break;
            }
          }
          break;
        }
      }
    }
  };

  // Handle selection change
  const handleSelectionChange = (field: keyof FinancialAccountInfo, value: string) => {
    setNewAccount({ ...newAccount, [field]: value });
    
    // Clear error when field is edited
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
    
    // If changing institution, reset legal entity
    if (field === "institution") {
      setNewAccount(prev => ({ ...prev, legalEntity: undefined }));
    }
    
    // If setting legal entity, also set legal entity identifier if available
    if (field === "legalEntity" && LEI_MAPPING[value]) {
      setNewAccount(prev => ({ 
        ...prev, 
        legalEntity: value,
        legalEntityIdentifier: LEI_MAPPING[value] 
      }));
    }
  };

  // Get legal entities for the selected institution
  const getLegalEntities = () => {
    if (newAccount.institution && LEGAL_ENTITIES[newAccount.institution]) {
      return LEGAL_ENTITIES[newAccount.institution];
    }
    return [];
  };

  // Extract value from currency option (e.g., "USD - US Dollar" -> "USD")
  const extractCurrencyCode = (currencyOption: string) => {
    return currencyOption.split(" - ")[0];
  };

  // Handle file upload
  const handleFilesSelected = (files: File[]) => {
    setNewAccount({ ...newAccount, statements: files });
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FinancialAccountInfo, string>> = {};
    const requiredFields: (keyof FinancialAccountInfo)[] = [
      'accountName', 
      'institution', 
      'accountType'
    ];
    
    requiredFields.forEach(field => {
      if (!newAccount[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add new account
  const handleAddAccount = () => {
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    onAddAccount(newAccount);
    
    toast({
      title: "Account added",
      description: `${newAccount.accountName} has been added successfully.`,
    });
    
    // Clear form after adding an account
    setNewAccount({
      accountName: "",
      institution: "",
      accountType: "cash",
      accountSubtype: "",
      currency: "",
      approximateValue: "",
      statements: []
    });
    setErrors({});
  };

  return (
    <div className="space-y-6 border p-4 rounded-md">
      <h3 className="font-medium flex items-center gap-2 text-black">
        <Wallet className="h-5 w-5 text-black" />
        Add a new financial account
      </h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="accountName">
            Account Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="accountName"
            name="accountName"
            value={newAccount.accountName}
            onChange={handleInputChange}
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
            value={newAccount.institution}
            onChange={(value) => handleSelectionChange('institution', value)}
            placeholder="Select institution"
            options={INSTITUTIONS.sort()}
            required
            className={errors.institution ? 'error' : ''}
            allowCustomValue={true}
          />
          
          <CustomSearchableSelect
            id="accountType"
            label="Account Type"
            value={newAccount.accountType.charAt(0).toUpperCase() + newAccount.accountType.slice(1)}
            onChange={(value) => handleSelectionChange('accountType', value.toLowerCase() as any)}
            placeholder="Select account type"
            options={ACCOUNT_TYPES.sort()}
            required
            className={errors.accountType ? 'error' : ''}
          />
        </div>
        
        {enableLegalEntityFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSearchableSelect
              id="legalEntity"
              label="Legal Entity"
              value={newAccount.legalEntity || ""}
              onChange={(value) => handleSelectionChange('legalEntity', value)}
              placeholder="Select legal entity"
              options={getLegalEntities()}
              allowCustomValue={true}
            />
            
            <div className="space-y-2">
              <Label htmlFor="legalEntityIdentifier">
                Legal Entity Identifier (LEI)
              </Label>
              <Input
                id="legalEntityIdentifier"
                name="legalEntityIdentifier"
                value={newAccount.legalEntityIdentifier || ""}
                onChange={handleInputChange}
                placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
                className="h-11"
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="accountSubtype">
              Account Subtype (optional)
            </Label>
            <Input
              id="accountSubtype"
              name="accountSubtype"
              value={newAccount.accountSubtype || ""}
              onChange={handleInputChange}
              placeholder="e.g., Managed Account, Private Equity"
              className="h-11"
            />
          </div>
          
          <CustomSearchableSelect
            id="currency"
            label="Primary Currency"
            value={newAccount.currency}
            onChange={(value) => handleSelectionChange('currency', extractCurrencyCode(value))}
            placeholder="Select currency"
            options={CURRENCIES.sort()}
            className=""
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="approximateValue">
            Approximate Value
          </Label>
          <Input
            id="approximateValue"
            name="approximateValue"
            value={newAccount.approximateValue || ""}
            onChange={handleInputChange}
            placeholder="e.g., 10,000,000"
            className="h-11"
          />
        </div>
        
        <div className="space-y-3">
          <Label>Account Statements</Label>
          <FileUploader
            accept="application/pdf,image/*"
            multiple={true}
            maxSize={5}
            onFilesSelected={handleFilesSelected}
            existingFiles={newAccount.statements}
            label="Upload Account Statements"
          />
        </div>
      </div>
      
      <Button
        type="button"
        onClick={handleAddAccount}
        className="mt-2"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Account
      </Button>
    </div>
  );
};

export default AccountForm;
