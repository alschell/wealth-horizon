
export type OrderType = "buy" | "sell";

export type ViewMode = "portfolios" | "institutions";

export type Institution = {
  id: string;
  name: string;
  legalEntities: LegalEntity[];
};

export type LegalEntity = {
  id: string;
  name: string;
  portfolios: Portfolio[];
  cashAccounts: CashAccount[];
  creditFacilities: CreditFacility[];
};

export type Portfolio = {
  id: string;
  name: string;
  institutionId: string;
  legalEntityId: string;
  holdings: Holding[];
};

export type Holding = {
  instrumentId: string;
  quantity: number;
  averagePurchasePrice: number;
};

export type CashAccount = {
  id: string;
  name: string;
  institutionId: string;
  legalEntityId: string;
  currency: string;
  balance: number;
};

export type CreditFacility = {
  id: string;
  name: string;
  institutionId: string;
  legalEntityId: string;
  currency: string;
  limit: number;
  used: number;
  available: number;
};

export type Instrument = {
  id: string;
  symbol: string;
  name: string;
  type: string;
  currentPrice: number;
  currency: string;
  exchange: string;
};

export type Broker = {
  id: string;
  name: string;
};

export type AllocationItem = {
  id: string;
  name: string;
  institutionName: string;
  legalEntityName: string;
  quantity?: number;
  amount?: number;
  currency?: string;
  available?: number;
};

export type InstrumentAllocation = {
  portfolioId: string;
  quantity: number;
};

export type FundingAllocation = {
  sourceId: string;
  sourceType: "cash" | "credit";
  amount: number;
  currency: string;
};

export type DepositAllocation = {
  destinationId: string;
  destinationType: "portfolio" | "cash";
  quantity?: number;
  amount?: number;
  currency?: string;
};

export type TradeOrder = {
  orderType: OrderType;
  instrumentId: string;
  quantity: number;
  price: number;
  totalAmount: number;
  brokerId: string | "best";
  instrumentAllocations: InstrumentAllocation[];
  fundingAllocations: FundingAllocation[];
  depositAllocations: DepositAllocation[];
};
