
export type IntegrationType = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
  status: 'stable' | 'beta' | 'deprecated';
  authMethod: 'oauth' | 'apiKey' | 'both';
  authUrl?: string;
  apiKeyName?: string;
  scopes?: string[];
};

export interface ApiKeyFormData {
  apiKey: string;
  service: string;
  [key: string]: string;
}
