
import React from "react";
import { IntegrationType } from "../types";
import { Cloud, Database, HardDrive } from "lucide-react";

export const storageIntegrations: IntegrationType[] = [
  {
    id: "aws-s3",
    name: "AWS S3",
    description: "Connect to Amazon S3 for secure cloud storage",
    icon: <Cloud className="h-6 w-6" />,
    category: "storage",
    features: [
      "Secure document storage",
      "Unlimited scalability",
      "Global availability"
    ],
    status: "stable" as const,
    authMethod: "apiKey" as const,
    apiKeyName: "AWS Access Key & Secret"
  },
  {
    id: "azure-blob",
    name: "Azure Blob Storage",
    description: "Microsoft Azure cloud storage solution",
    icon: <Database className="h-6 w-6" />,
    category: "storage",
    features: [
      "Enterprise-grade security",
      "Geo-redundant storage",
      "Seamless Microsoft integration"
    ],
    status: "stable" as const,
    authMethod: "oauth" as const,
    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize"
  },
  {
    id: "google-cloud-storage",
    name: "Google Cloud Storage",
    description: "Google's object storage for companies of all sizes",
    icon: <HardDrive className="h-6 w-6" />,
    category: "storage",
    features: [
      "High availability",
      "Data analytics integration",
      "Intelligent data management"
    ],
    status: "stable" as const,
    authMethod: "both" as const,
    authUrl: "https://accounts.google.com/o/oauth2/auth",
    apiKeyName: "Google Cloud API Key"
  }
].sort((a, b) => a.name.localeCompare(b.name));
