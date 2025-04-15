
import { ReactNode } from "react";

export interface IntegrationType {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  category: string;
  features: string[];
  status: "beta" | "stable";
  authMethod: "oauth" | "apiKey" | "both";
  authUrl?: string;
  apiKeyName?: string;
  scopes?: string[];
}

export interface ConnectedIntegrationType extends IntegrationType {
  connectionStatus: "active" | "needs attention";
  lastSynced: string;
}

export interface CategoryType {
  id: string;
  name: string;
  icon?: ReactNode;
}

export interface ApiKeyFormData {
  apiKey: string;
  service: string;
}
