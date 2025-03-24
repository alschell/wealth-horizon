
import React from "react";
import { FinancialAccountInfo } from "@/types/onboarding";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CustomSearchableSelect from "@/components/ui/custom-searchable-select";
import { INSTITUTIONS } from "@/utils/constants";

interface LegalEntitySectionProps {
  account: FinancialAccountInfo;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectionChange: (field: keyof FinancialAccountInfo, value: string) => void;
}

const LegalEntitySection = ({
  account,
  onInputChange,
  onSelectionChange
}: LegalEntitySectionProps) => {
  // Top 100 global banks
  const topBanks = [
    "JPMorgan Chase", "Bank of America", "Citigroup", "Wells Fargo", "Goldman Sachs",
    "Morgan Stanley", "U.S. Bancorp", "Truist Financial", "PNC Financial Services", "TD Bank",
    "Capital One", "Bank of New York Mellon", "State Street", "HSBC", "Barclays",
    "Deutsche Bank", "Credit Suisse", "UBS", "BNP Paribas", "Société Générale",
    "BBVA", "Santander", "ING Group", "UniCredit", "Intesa Sanpaolo",
    "Crédit Agricole", "Natixis", "Industrial and Commercial Bank of China", "China Construction Bank", "Agricultural Bank of China",
    "Bank of China", "Mitsubishi UFJ Financial Group", "Mizuho Financial Group", "Sumitomo Mitsui Financial Group", "Nomura Holdings",
    "Royal Bank of Canada", "Toronto-Dominion Bank", "Bank of Montreal", "Scotiabank", "CIBC",
    "ANZ Banking Group", "Commonwealth Bank of Australia", "National Australia Bank", "Westpac", "Standard Chartered",
    "DBS Bank", "OCBC Bank", "United Overseas Bank", "Maybank", "CIMB Group",
    "Sberbank", "VTB Bank", "Alfa-Bank", "Gazprombank", "Raiffeisen Bank",
    "KB Kookmin Bank", "Shinhan Bank", "Woori Bank", "Hana Bank", "KEB Hana Bank",
    "ICICI Bank", "HDFC Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank",
    "First Abu Dhabi Bank", "Emirates NBD", "Qatar National Bank", "National Bank of Kuwait", "Samba Financial Group",
    "Standard Bank", "FirstRand", "Absa Group", "Nedbank", "Investec",
    "Banco do Brasil", "Itaú Unibanco", "Banco Bradesco", "Banco Santander Brasil", "Caixa Econômica Federal",
    "Banco de Chile", "Bancolombia", "Grupo Financiero Banorte", "Grupo Aval", "Credicorp",
    "KASIKORNBANK", "Siam Commercial Bank", "Bangkok Bank", "Krung Thai Bank", "Bank of Ayudhya",
    "Türkiye İş Bankası", "Garanti BBVA", "Akbank", "Yapı Kredi", "Ziraat Bankası",
    "Other"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="legalEntityIdentifier">
          Legal Entity Identifier (LEI)<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          id="legalEntityIdentifier"
          name="legalEntityIdentifier"
          value={account.legalEntityIdentifier || ""}
          onChange={onInputChange}
          placeholder="e.g., 7H6GLXDRUGQFU57RNE97"
          className="h-11"
        />
        <p className="text-xs text-gray-500">
          Enter an LEI to automatically select the institution and legal entity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSearchableSelect
          id="legalEntity"
          label="Legal Entity"
          value={account.legalEntity || ""}
          onChange={(value) => onSelectionChange('legalEntity', value)}
          placeholder="Select legal entity"
          options={[]}
          allowCustomValue={true}
          required={true}
        />
      </div>
    </div>
  );
};

export default LegalEntitySection;
