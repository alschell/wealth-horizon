
// Application constants

// Document types for legal documents
export const DOCUMENT_TYPES = [
  "Certificate of Incorporation",
  "Operating Agreement",
  "Articles of Organization",
  "Tax Identification Document",
  "Trust Deed",
  "Partnership Agreement",
  "Bylaws",
  "Power of Attorney",
  "Passport",
  "Driver's License",
  "Investment Policy Statement",
  "Other"
];

// Entity types
export const ENTITY_TYPES = [
  "Single Family Office",
  "Multi-Family Office",
  "Trust",
  "Foundation",
  "Limited Partnership",
  "LLC",
  "Corporation",
  "Other"
];

// Financial data aggregators
export const AGGREGATORS = [
  "Addepar",
  "BlackDiamond",
  "eMoney",
  "Envestnet",
  "Morningstar",
  "Orion",
  "PCR",
  "Refinitiv",
  "SEI",
  "Tamarac",
  "Other"
];

// Asset classes
export const ASSET_CLASSES = [
  "Equities",
  "Fixed Income",
  "Alternative Investments",
  "Cash & Equivalents",
  "Real Estate",
  "Private Equity",
  "Commodities",
  "Cryptocurrency",
  "Other"
];

// Countries for address selection
export const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Switzerland",
  "Germany",
  "France",
  "Singapore",
  "Hong Kong",
  "Japan",
  "Other"
];

// US States
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
  "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
  "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "District of Columbia"
];

// API endpoints (would be environment variables in a real app)
export const API_ENDPOINTS = {
  AUTH: "/api/auth",
  USERS: "/api/users",
  CLIENTS: "/api/clients",
  PORTFOLIOS: "/api/portfolios",
  TRANSACTIONS: "/api/transactions",
  REPORTS: "/api/reports",
  MARKET_DATA: "/api/market-data",
  DOCUMENTS: "/api/documents"
};

// Feature flags
export const FEATURES = {
  ENABLE_CRYPTO: true,
  ENABLE_ESG: true,
  ENABLE_ALTERNATIVE_INVESTMENTS: true,
  ENABLE_LEGACY_PLANNING: true,
  ENABLE_TAX_OPTIMIZATION: true
};
