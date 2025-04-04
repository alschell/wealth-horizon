
import React from "react";
import { CategoryType } from "../types";

export const integrationCategories: CategoryType[] = [
  { id: "accounting", name: "Accounting" },
  { id: "aggregators", name: "Aggregators" },
  { id: "banking", name: "Banking" },
  { id: "crypto", name: "Crypto Services" },
  { id: "document", name: "Document Management" },
  { id: "esg", name: "ESG & Impact" },
  { id: "legal", name: "Legal Services" },
  { id: "reporting", name: "Reporting" },
  { id: "storage", name: "Storage Providers" },
  { id: "tax", name: "Tax Services" }
];

// Log the categories to ensure they're correctly defined
console.log("Integration categories defined:", integrationCategories);
