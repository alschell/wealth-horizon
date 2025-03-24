
import React from "react";
import { FinancialAccountInfo } from "@/context/OnboardingContext";
import { 
  InputField, 
  SelectField, 
  SearchableSelectField,
  FileField
} from "./fields";
import { INSTITUTIONS, CURRENCIES, ACCOUNT_TYPES } from "@/utils/financialDataConstants";

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
  // Get legal entities for the selected institution
  const getLegalEntities = () => {
    if (account.institution && LEGAL_ENTITIES[account.institution]) {
      return LEGAL_ENTITIES[account.institution];
    }
    return [];
  };

  // Handle legal entity selection
  const handleLegalEntityChange = (value: string) => {
    onSelectionChange("legalEntity", value);
    
    // Update the Legal Entity Identifier if available
    if (LEI_MAPPING[value]) {
      onSelectionChange("legalEntityIdentifier", LEI_MAPPING[value]);
    }
  };

  // Handle legal entity identifier change
  const handleLeiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e);
    
    // Try to find and populate institution and legal entity from LEI
    const lei = e.target.value;
    for (const [entityName, entityLei] of Object.entries(LEI_MAPPING)) {
      if (entityLei === lei) {
        // Find the institution this entity belongs to
        for (const [instName, entities] of Object.entries(LEGAL_ENTITIES)) {
          if (entities.includes(entityName)) {
            onSelectionChange("institution", instName);
            onSelectionChange("legalEntity", entityName);
            break;
          }
        }
        break;
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2 md:col-span-2">
        <InputField
          id="accountName"
          label="Account Name"
          name="accountName"
          value={account.accountName}
          onChange={onInputChange}
          placeholder="e.g., Main Investment Portfolio at UBS"
          required
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="institution"
          label="Institution"
          value={account.institution}
          placeholder="Select institution"
          options={INSTITUTIONS.sort()}
          required
          onChange={(value) => onSelectionChange("institution", value)}
          allowCustomValue={true}
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          placeholder="Select legal entity"
          options={getLegalEntities()}
          onChange={handleLegalEntityChange}
          allowCustomValue={true}
        />
      </div>
      
      <div>
        <InputField
          id="legalEntityIdentifier"
          label="Legal Entity Identifier"
          name="legalEntityIdentifier"
          value={account.legalEntityIdentifier || ""}
          onChange={handleLeiChange}
          placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="accountType"
          label="Account Type"
          value={account.accountType}
          placeholder="Select account type"
          options={ACCOUNT_TYPES.sort()}
          required
          onChange={(value) => onSelectionChange("accountType", value as any)}
          extractValue={(type) => type.toLowerCase()}
        />
      </div>
      
      <div>
        <InputField
          id="accountSubtype"
          label="Account Subtype (optional)"
          name="accountSubtype"
          value={account.accountSubtype || ""}
          onChange={onInputChange}
          placeholder="e.g., Managed Account, Private Equity"
        />
      </div>
      
      <div>
        <SearchableSelectField
          id="currency"
          label="Primary Currency"
          value={account.currency}
          placeholder="Select currency"
          options={CURRENCIES.sort()}
          onChange={(value) => onSelectionChange("currency", value.split(" - ")[0])}
        />
      </div>
      
      <div>
        <InputField
          id="approximateValue"
          label="Approximate Value"
          name="approximateValue"
          value={account.approximateValue || ""}
          onChange={onInputChange}
          placeholder="e.g., 10,000,000"
        />
      </div>

      <div className="md:col-span-2">
        <FileField
          label="Account Statements"
          files={account.statements}
          onFilesSelected={onStatementsSelected}
        />
      </div>
    </div>
  );
};

export default AccountFormFields;
