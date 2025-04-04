
import React from "react";
import { IntegrationType } from "../types";
import { FileSearch, Layers, FileLock2 } from "lucide-react";

export const documentIntegrations: IntegrationType[] = [
  {
    id: "box",
    name: "Box",
    description: "Enterprise content management platform",
    icon: <Layers className="h-6 w-6" />,
    category: "document",
    features: [
      "Centralized file storage",
      "Version control",
      "Secure collaboration"
    ],
    status: "stable" as const,
    authMethod: "oauth" as const,
    authUrl: "https://account.box.com/api/oauth2/authorize"
  },
  {
    id: "dropbox",
    name: "Dropbox",
    description: "Cloud-based file storage and sharing",
    icon: <FileSearch className="h-6 w-6" />,
    category: "document",
    features: [
      "Document repository",
      "File synchronization",
      "Team collaboration tools"
    ],
    status: "stable" as const,
    authMethod: "oauth" as const,
    authUrl: "https://www.dropbox.com/oauth2/authorize"
  },
  {
    id: "vault",
    name: "Vault",
    description: "Document security and compliance management",
    icon: <FileLock2 className="h-6 w-6" />,
    category: "document",
    features: [
      "Document encryption",
      "Access controls",
      "Compliance audit trails"
    ],
    status: "stable" as const,
    authMethod: "both" as const,
    authUrl: "https://auth.vault.com/authorize",
    apiKeyName: "Vault API Key"
  }
].sort((a, b) => a.name.localeCompare(b.name));
