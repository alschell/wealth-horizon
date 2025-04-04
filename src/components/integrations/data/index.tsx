
import { integrationCategories } from "./categories";
import { cryptoIntegrations } from "./crypto-integrations";
import { taxIntegrations } from "./tax-integrations";
import { accountingIntegrations } from "./accounting-integrations"; 
import { bankingIntegrations } from "./banking-integrations";
import { reportingIntegrations } from "./reporting-integrations";
import { connectedIntegrations } from "./connected-integrations";
import { IntegrationType } from "../types";

// Combine all integrations into a single array for the available integrations
export const availableIntegrations: IntegrationType[] = [
  ...cryptoIntegrations,
  ...taxIntegrations,
  ...accountingIntegrations,
  ...bankingIntegrations,
  ...reportingIntegrations
];

export {
  integrationCategories,
  cryptoIntegrations,
  taxIntegrations,
  accountingIntegrations,
  bankingIntegrations,
  reportingIntegrations,
  connectedIntegrations
};
