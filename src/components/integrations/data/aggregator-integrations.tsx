
import React from "react";
import { IntegrationType } from "../types";
import { LineChart, Database } from "lucide-react";
import { AGGREGATORS } from "@/utils/constants";

// Create integrations from the AGGREGATORS array
export const aggregatorIntegrations: IntegrationType[] = AGGREGATORS.map((aggregator) => {
  // Skip "Other" as it's not a real aggregator
  if (aggregator === "Other") return null;
  
  return {
    id: aggregator.toLowerCase().replace(/\s+/g, "-"),
    name: aggregator,
    description: `Connect to ${aggregator} for financial data aggregation`,
    icon: aggregator.includes("Data") ? <Database className="h-6 w-6" /> : <LineChart className="h-6 w-6" />,
    category: "aggregators",
    features: [
      "Automatic data import",
      "Financial data consolidation",
      "Reporting integration"
    ],
    status: "stable",
    authMethod: "apiKey",
    apiKeyName: `${aggregator} API Key`
  };
}).filter(Boolean) as IntegrationType[];

// Sort alphabetically by name
aggregatorIntegrations.sort((a, b) => a.name.localeCompare(b.name));
