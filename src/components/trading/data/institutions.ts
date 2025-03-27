
import { Institution } from "../types";
import { mockPortfoliosFlat } from "./portfolios";
import { mockCashAccountsFlat } from "./cashAccounts";
import { mockCreditFacilitiesFlat } from "./creditFacilities";

// Hierarchical structure for institutions view
export const mockPortfoliosByInstitution: Institution[] = [
  {
    id: "inst-1",
    name: "HSBC",
    legalEntities: [
      {
        id: "le-1",
        name: "HSBC Holdings plc",
        portfolios: [
          mockPortfoliosFlat[0],
          mockPortfoliosFlat[1],
          mockPortfoliosFlat[4]
        ],
        cashAccounts: [
          mockCashAccountsFlat[0],
          mockCashAccountsFlat[1],
          mockCashAccountsFlat[5]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[0],
          mockCreditFacilitiesFlat[1],
          mockCreditFacilitiesFlat[4]
        ]
      }
    ]
  },
  {
    id: "inst-2",
    name: "Citibank",
    legalEntities: [
      {
        id: "le-2",
        name: "Citigroup Global Markets Ltd",
        portfolios: [
          mockPortfoliosFlat[2],
          mockPortfoliosFlat[5]
        ],
        cashAccounts: [
          mockCashAccountsFlat[2],
          mockCashAccountsFlat[3],
          mockCashAccountsFlat[6]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[2]
        ]
      },
      {
        id: "le-3",
        name: "Citibank NA",
        portfolios: [
          mockPortfoliosFlat[3]
        ],
        cashAccounts: [
          mockCashAccountsFlat[4]
        ],
        creditFacilities: [
          mockCreditFacilitiesFlat[3],
          mockCreditFacilitiesFlat[5]
        ]
      }
    ]
  }
];

// Structured cash accounts for institutions view
export const mockCashAccountsByInstitution: Institution[] = mockPortfoliosByInstitution;

// Structured credit facilities for institutions view
export const mockCreditFacilitiesByInstitution: Institution[] = mockPortfoliosByInstitution;
