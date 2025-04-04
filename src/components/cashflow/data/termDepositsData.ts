
// Sample data for active term deposits
export const activeDeposits = [
  {
    id: "td1",
    bank: "JP Morgan Chase",
    amount: 500000,
    currency: "USD",
    rate: 4.25,
    startDate: "2023-03-15",
    maturityDate: "2023-09-15",
    term: "6 months",
    interest: 10625
  },
  {
    id: "td2",
    bank: "Credit Suisse",
    amount: 300000,
    currency: "CHF",
    rate: 3.75,
    startDate: "2023-04-01",
    maturityDate: "2024-04-01",
    term: "12 months",
    interest: 11250
  },
  {
    id: "td3",
    bank: "HSBC Holdings",
    amount: 450000,
    currency: "EUR",
    rate: 3.9,
    startDate: "2023-05-10",
    maturityDate: "2023-08-10",
    term: "3 months",
    interest: 4387.5
  }
];

// Sample data for bank rates
export const bankRates = [
  { id: "br1", bank: "JP Morgan Chase", currency: "USD", term: "3 months", rate: 4.10 },
  { id: "br2", bank: "JP Morgan Chase", currency: "USD", term: "6 months", rate: 4.25 },
  { id: "br3", bank: "JP Morgan Chase", currency: "USD", term: "12 months", rate: 4.40 },
  { id: "br4", bank: "Credit Suisse", currency: "CHF", term: "3 months", rate: 3.60 },
  { id: "br5", bank: "Credit Suisse", currency: "CHF", term: "6 months", rate: 3.75 },
  { id: "br6", bank: "Credit Suisse", currency: "CHF", term: "12 months", rate: 3.90 },
  { id: "br7", bank: "HSBC Holdings", currency: "EUR", term: "3 months", rate: 3.90 },
  { id: "br8", bank: "HSBC Holdings", currency: "EUR", term: "6 months", rate: 4.05 },
  { id: "br9", bank: "HSBC Holdings", currency: "EUR", term: "12 months", rate: 4.20 }
];
