
import React from "react";
import { IntegrationType } from "../types";
import { LineChart, Globe, Leaf } from "lucide-react";

export const esgIntegrations: IntegrationType[] = [
  {
    id: "sustainalytics",
    name: "Sustainalytics",
    description: "ESG risk ratings and research",
    icon: <LineChart className="h-6 w-6" />,
    category: "esg",
    features: [
      "ESG risk assessment",
      "Portfolio screening",
      "Sustainability reporting"
    ],
    status: "stable" as const,
    authMethod: "apiKey" as const,
    apiKeyName: "Sustainalytics API Key"
  },
  {
    id: "msci-esg",
    name: "MSCI ESG",
    description: "Environmental, Social and Governance ratings",
    icon: <Globe className="h-6 w-6" />,
    category: "esg",
    features: [
      "Climate risk analysis",
      "ESG ratings & research",
      "Impact measurement tools"
    ],
    status: "stable" as const,
    authMethod: "apiKey" as const,
    apiKeyName: "MSCI ESG API Key"
  },
  {
    id: "impact-metrics",
    name: "Impact Metrics",
    description: "Track and measure impact investments",
    icon: <Leaf className="h-6 w-6" />,
    category: "esg",
    features: [
      "SDG alignment analysis",
      "Impact reporting",
      "Portfolio sustainability scoring"
    ],
    status: "beta" as const,
    authMethod: "both" as const,
    authUrl: "https://auth.impactmetrics.io/authorize",
    apiKeyName: "Impact Metrics API Key"
  }
].sort((a, b) => a.name.localeCompare(b.name));
