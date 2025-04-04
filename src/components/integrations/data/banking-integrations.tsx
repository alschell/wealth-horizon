
import React from "react";
import { IntegrationType } from "../types";
import { CreditCard } from "lucide-react";

export const bankingIntegrations: IntegrationType[] = [
  {
    id: "plaid",
    name: "Plaid",
    description: "Connect bank accounts securely",
    icon: <CreditCard className="h-6 w-6" />,
    category: "banking",
    features: [
      "Secure bank connections",
      "Transaction history",
      "Account balance monitoring"
    ],
    status: "stable",
    authMethod: "apiKey",
    apiKeyName: "Plaid Client ID and Secret"
  }
];
