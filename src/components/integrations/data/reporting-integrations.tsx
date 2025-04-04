
import React from "react";
import { IntegrationType } from "../types";
import { BarChart, LineChart } from "lucide-react";

export const reportingIntegrations: IntegrationType[] = [
  {
    id: "power-bi",
    name: "Power BI",
    description: "Microsoft's business analytics service",
    icon: <LineChart className="h-6 w-6" />,
    category: "reporting",
    features: [
      "Custom wealth reports",
      "Interactive data exploration",
      "Scheduled report delivery"
    ],
    status: "beta" as const,
    authMethod: "oauth",
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
  },
  {
    id: "tableau",
    name: "Tableau",
    description: "Advanced data visualization and reporting",
    icon: <BarChart className="h-6 w-6" />,
    category: "reporting",
    features: [
      "Custom wealth dashboards",
      "Interactive visualizations",
      "Data-driven insights"
    ],
    status: "stable" as const,
    authMethod: "apiKey",
    apiKeyName: "Tableau API Token"
  }
].sort((a, b) => a.name.localeCompare(b.name));
