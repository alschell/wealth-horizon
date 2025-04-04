
import React from "react";
import { IntegrationType } from "../types";
import { Scale, FileText, BarChart3 } from "lucide-react";

export const legalIntegrations: IntegrationType[] = [
  {
    id: "docusign",
    name: "DocuSign",
    description: "Secure electronic signature and agreement management",
    icon: <FileText className="h-6 w-6" />,
    category: "legal",
    features: [
      "Electronic signatures",
      "Contract management",
      "Document workflow automation"
    ],
    status: "stable" as const,
    authMethod: "oauth" as const,
    authUrl: "https://account-d.docusign.com/oauth/auth"
  },
  {
    id: "lexisnexis",
    name: "LexisNexis",
    description: "Legal research and regulatory compliance tools",
    icon: <Scale className="h-6 w-6" />,
    category: "legal",
    features: [
      "Legal research database",
      "Compliance monitoring",
      "Business intelligence"
    ],
    status: "stable" as const,
    authMethod: "apiKey" as const,
    apiKeyName: "LexisNexis API Key"
  },
  {
    id: "contractworks",
    name: "ContractWorks",
    description: "Contract management and reporting solution",
    icon: <BarChart3 className="h-6 w-6" />,
    category: "legal",
    features: [
      "Contract repository",
      "Automated alerts for key dates",
      "Custom reporting for legal documents"
    ],
    status: "beta" as const,
    authMethod: "apiKey" as const,
    apiKeyName: "ContractWorks API Key"
  }
].sort((a, b) => a.name.localeCompare(b.name));
