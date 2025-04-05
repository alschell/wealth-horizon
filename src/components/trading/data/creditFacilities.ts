
import { CreditFacility } from "../types";

export const mockCreditFacilitiesFlat: CreditFacility[] = [
  {
    id: "credit-1",
    name: "Corporate Credit Line",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "USD",
    limit: 10000000,
    used: 2500000,
    available: 7500000,
    type: "Credit Line",
    interestRate: 4.5
  },
  {
    id: "credit-2",
    name: "Euro Credit Facility",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "EUR",
    limit: 5000000,
    used: 1000000,
    available: 4000000,
    type: "Credit Facility",
    interestRate: 3.75
  },
  {
    id: "credit-3",
    name: "USD Credit Line",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    currency: "USD",
    limit: 3000000,
    used: 1500000,
    available: 1500000,
    type: "Credit Line",
    interestRate: 4.25
  },
  {
    id: "credit-4",
    name: "Multicurrency Facility",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    currency: "USD",
    limit: 7500000,
    used: 3000000,
    available: 4500000,
    type: "Multi-currency Facility",
    interestRate: 4.0
  },
  {
    id: "credit-5",
    name: "GBP Credit Line",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    currency: "GBP",
    limit: 4000000,
    used: 1200000,
    available: 2800000,
    type: "Credit Line",
    interestRate: 4.1
  },
  {
    id: "credit-6",
    name: "Investment Credit Facility",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    currency: "EUR",
    limit: 6000000,
    used: 2000000,
    available: 4000000,
    type: "Investment Facility",
    interestRate: 3.9
  }
];
