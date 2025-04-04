
export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  status: "active" | "invited" | "inactive";
  avatar?: string;
  lastActivity?: string;
  dataAccess: string;
  permissions: {
    dashboard: boolean;
    wealth: boolean;
    trading: boolean;
    marketData: boolean;
    cashflow: boolean;
    analyzeWealth: boolean;
    integrations: boolean;
    settings: boolean;
  };
}

export interface UserFormData {
  name: string;
  email: string;
  role: "admin" | "member" | "viewer";
  dataAccess: string;
  permissions: {
    dashboard: boolean;
    wealth: boolean;
    trading: boolean;
    marketData: boolean;
    cashflow: boolean;
    analyzeWealth: boolean;
    integrations: boolean;
    settings: boolean;
  };
}
