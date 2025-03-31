
import { Bank } from "../types";

// Using the same banks as in the brokers list for consistency
export const mockBanks: Bank[] = [
  {
    id: "bank-1",
    name: "JP Morgan Chase",
    description: "Global leader in financial services offering wealth management and investment advisory services",
    services: ["Wealth Management", "Estate Planning", "Investment Advisory"],
    expertise: ["Global Equities", "Fixed Income", "Alternative Investments"],
    fee: "0.75-1.25%"
  },
  {
    id: "bank-2",
    name: "UBS",
    description: "Swiss multinational investment bank providing sophisticated wealth management solutions",
    services: ["Private Banking", "Asset Management", "Investment Banking"],
    expertise: ["European Markets", "Sustainable Investing", "Ultra High Net Worth"],
    fee: "0.8-1.5%"
  },
  {
    id: "bank-3",
    name: "Goldman Sachs",
    description: "Leading global investment banking and wealth management firm",
    services: ["Private Wealth Management", "Investment Strategy", "Alternative Investments"],
    expertise: ["Strategic Asset Allocation", "Private Equity", "Hedge Funds"],
    fee: "1.0-1.75%"
  },
  {
    id: "bank-4",
    name: "Credit Suisse",
    description: "Swiss investment bank and financial services firm with global wealth management capabilities",
    services: ["Investment Advisory", "Family Office Services", "Succession Planning"],
    expertise: ["Multi-generational Wealth", "Real Estate", "Private Markets"],
    fee: "0.7-1.4%"
  },
  {
    id: "bank-5",
    name: "Morgan Stanley",
    description: "American multinational investment bank specializing in wealth and investment management",
    services: ["Wealth Management", "Investment Solutions", "Financial Planning"],
    expertise: ["US Markets", "Technology Sector", "Portfolio Construction"],
    fee: "0.8-1.5%"
  },
  {
    id: "bank-6",
    name: "HSBC Private Bank",
    description: "Global private banking division providing personalized wealth solutions",
    services: ["International Banking", "Wealth Planning", "Investment Advisory"],
    expertise: ["Cross-border Investments", "Emerging Markets", "Treasury Solutions"],
    fee: "0.6-1.2%"
  },
  {
    id: "bank-7",
    name: "BNP Paribas",
    description: "French international banking group offering wealth management and advisory services",
    services: ["Private Banking", "Asset Management", "Wealth Structuring"],
    expertise: ["European Markets", "Sustainable Investments", "Art Advisory"],
    fee: "0.7-1.3%"
  },
  {
    id: "bank-8",
    name: "Barclays Private Bank",
    description: "British private banking division providing tailored wealth solutions",
    services: ["Wealth Advisory", "Investment Management", "Banking & Credit"],
    expertise: ["UK Markets", "Philanthropy", "Next Generation Planning"],
    fee: "0.65-1.35%"
  }
];
