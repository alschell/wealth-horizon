
import React from "react";
import { IntegrationType } from "../types";
import { ReceiptText } from "lucide-react";

export const accountingIntegrations: IntegrationType[] = [
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Connect your accounting software for seamless reporting",
    icon: <ReceiptText className="h-6 w-6" />,
    category: "accounting",
    features: [
      "Sync financial data",
      "Automated bookkeeping",
      "Consolidated financial statements"
    ],
    status: "stable",
    authMethod: "oauth",
    authUrl: "https://appcenter.intuit.com/connect/oauth2"
  },
  {
    id: "xero",
    name: "Xero",
    description: "Cloud-based accounting software connection",
    icon: <ReceiptText className="h-6 w-6" />,
    category: "accounting",
    features: [
      "Real-time financial data",
      "Automated reconciliation",
      "Custom financial reports"
    ],
    status: "stable",
    authMethod: "oauth",
    authUrl: "https://login.xero.com/identity/connect/authorize"
  }
];
