
import React from "react";
import { IntegrationType } from "../types";
import { Calculator, FileText } from "lucide-react";

export const taxIntegrations: IntegrationType[] = [
  {
    id: "koinly",
    name: "Koinly",
    description: "Crypto tax software for investors and accountants",
    icon: <Calculator className="h-6 w-6" />,
    category: "tax",
    features: [
      "Import from 350+ exchanges",
      "Tax loss harvesting",
      "Capital gains reports"
    ],
    status: "stable",
    authMethod: "apiKey",
    apiKeyName: "Koinly API Key"
  },
  {
    id: "taxbit",
    name: "TaxBit",
    description: "Automated cryptocurrency tax reporting and compliance",
    icon: <Calculator className="h-6 w-6" />,
    category: "tax",
    features: [
      "Crypto tax calculations",
      "Automated tax forms",
      "Year-round tax optimization"
    ],
    status: "stable",
    authMethod: "oauth",
    authUrl: "https://taxbit.com/app/oauth/authorize"
  },
  {
    id: "turbotax",
    name: "TurboTax",
    description: "Import financial data directly to TurboTax",
    icon: <FileText className="h-6 w-6" />,
    category: "tax",
    features: [
      "Investment data import",
      "Tax document organization",
      "Capital gains reporting"
    ],
    status: "beta",
    authMethod: "oauth",
    authUrl: "https://accounts.intuit.com/oauth2/v2/authorize"
  }
].sort((a, b) => a.name.localeCompare(b.name));
