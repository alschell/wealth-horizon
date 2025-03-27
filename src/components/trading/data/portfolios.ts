
import { Portfolio } from "../types";

export const mockPortfoliosFlat: Portfolio[] = [
  {
    id: "port-1",
    name: "Global Equities Portfolio",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    holdings: [
      { instrumentId: "instr-1", quantity: 1000, averagePurchasePrice: 150.25 },
      { instrumentId: "instr-2", quantity: 500, averagePurchasePrice: 290.15 },
      { instrumentId: "instr-3", quantity: 200, averagePurchasePrice: 120.50 },
      { instrumentId: "instr-8", quantity: 300, averagePurchasePrice: 160.50 },
      { instrumentId: "instr-11", quantity: 150, averagePurchasePrice: 495.75 },
      { instrumentId: "instr-14", quantity: 400, averagePurchasePrice: 105.80 }
    ]
  },
  {
    id: "port-2",
    name: "Tech Growth Portfolio",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    holdings: [
      { instrumentId: "instr-1", quantity: 2000, averagePurchasePrice: 145.30 },
      { instrumentId: "instr-4", quantity: 300, averagePurchasePrice: 160.75 },
      { instrumentId: "instr-5", quantity: 500, averagePurchasePrice: 190.20 },
      { instrumentId: "instr-16", quantity: 800, averagePurchasePrice: 45.60 },
      { instrumentId: "instr-18", quantity: 200, averagePurchasePrice: 490.30 }
    ]
  },
  {
    id: "port-3",
    name: "European Equities",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    holdings: [
      { instrumentId: "instr-6", quantity: 1500, averagePurchasePrice: 65.80 },
      { instrumentId: "instr-7", quantity: 800, averagePurchasePrice: 92.60 }
    ]
  },
  {
    id: "port-4",
    name: "US Tech Portfolio",
    institutionId: "inst-2",
    legalEntityId: "le-3",
    holdings: [
      { instrumentId: "instr-1", quantity: 750, averagePurchasePrice: 155.50 },
      { instrumentId: "instr-2", quantity: 300, averagePurchasePrice: 310.25 },
      { instrumentId: "instr-4", quantity: 450, averagePurchasePrice: 170.30 },
      { instrumentId: "instr-3", quantity: 350, averagePurchasePrice: 125.40 },
      { instrumentId: "instr-5", quantity: 650, averagePurchasePrice: 185.50 }
    ]
  },
  {
    id: "port-5",
    name: "Dividend Income Portfolio",
    institutionId: "inst-1",
    legalEntityId: "le-1",
    holdings: [
      { instrumentId: "instr-10", quantity: 600, averagePurchasePrice: 155.20 },
      { instrumentId: "instr-13", quantity: 1200, averagePurchasePrice: 35.40 },
      { instrumentId: "instr-15", quantity: 900, averagePurchasePrice: 26.80 },
      { instrumentId: "instr-17", quantity: 400, averagePurchasePrice: 145.60 },
      { instrumentId: "instr-19", quantity: 750, averagePurchasePrice: 65.30 }
    ]
  },
  {
    id: "port-6",
    name: "Financial Services Portfolio",
    institutionId: "inst-2",
    legalEntityId: "le-2",
    holdings: [
      { instrumentId: "instr-8", quantity: 800, averagePurchasePrice: 175.40 },
      { instrumentId: "instr-9", quantity: 400, averagePurchasePrice: 260.75 },
      { instrumentId: "instr-13", quantity: 2000, averagePurchasePrice: 36.20 }
    ]
  }
];
