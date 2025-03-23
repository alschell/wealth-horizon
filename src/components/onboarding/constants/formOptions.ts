
// Form options for the onboarding forms

// Legal entity types
export const LEGAL_ENTITY_TYPES = [
  "Limited Liability Company (LLC)",
  "Corporation",
  "Partnership",
  "Trust",
  "Foundation",
  "Limited Partnership (LP)",
  "Sole Proprietorship",
  "Private Investment Company (PIC)",
  "Non-Profit Organization",
  "Other"
];

// Jurisdictions
export const JURISDICTIONS = [
  "United States",
  "United Kingdom",
  "Switzerland",
  "Singapore",
  "Luxembourg",
  "Cayman Islands",
  "British Virgin Islands",
  "Hong Kong",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Ireland",
  "Japan",
  "China",
  "United Arab Emirates",
  "New Zealand",
  "Bermuda",
  "Bahamas",
  "Channel Islands",
  "Other"
];

// Document types
export const DOCUMENT_TYPES = [
  { value: "incorporation", label: "Certificate of Incorporation" },
  { value: "registration", label: "Business Registration" },
  { value: "taxCertificate", label: "Tax Certificate" },
  { value: "ownership", label: "Ownership Structure" },
  { value: "other", label: "Other Legal Document" }
];

// Identification document types
export const ID_DOCUMENT_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "drivingLicense", label: "Driving License" },
  { value: "nationalId", label: "National ID" }
];

// Countries
export const COUNTRIES = [
  "Australia", "Brazil", "Canada", "China", "Denmark", "France", 
  "Germany", "India", "Italy", "Japan", "Mexico", "Netherlands", 
  "New Zealand", "Norway", "South Africa", "Spain", "Sweden", 
  "Switzerland", "United Kingdom", "United States"
].sort();

// US States
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
  "New Hampshire", "New Jersey", "New Mexico", "New York", 
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
  "West Virginia", "Wisconsin", "Wyoming"
].sort();

// Aggregators
export const AGGREGATORS = [
  "Addepar",
  "Allvue",
  "Backstop Solutions",
  "Black Diamond",
  "Canoe Intelligence",
  "Clearwater Analytics",
  "Dynamo Software",
  "Eze Castle",
  "FactSet",
  "FIS",
  "FundCount",
  "Ledgex",
  "Masttro",
  "Mirador",
  "PCR",
  "Pitchbook",
  "SEI Archway",
  "Solovis",
  "SS&C Advent",
  "SS&C Geneva",
  "Tamarac",
  "Yardi"
];

// Also export INSTITUTIONS for ManualEntrySection
export const INSTITUTIONS = [
  "Addepar",
  "Bank of America",
  "Barclays",
  "BlackRock",
  "BNP Paribas",
  "Charles Schwab",
  "Citibank",
  "Credit Suisse",
  "Deutsche Bank",
  "Fidelity",
  "Goldman Sachs",
  "HSBC",
  "J.P. Morgan",
  "Julius Baer",
  "LGT Bank",
  "Morgan Stanley",
  "Northern Trust",
  "Pictet",
  "Raymond James",
  "Rothschild & Co",
  "State Street",
  "TD Ameritrade",
  "UBS",
  "Vanguard",
  "Wells Fargo"
].sort();

// Account types
export const ACCOUNT_TYPES = [
  "Investment",
  "Checking",
  "Savings",
  "Brokerage",
  "Custody",
  "Trust",
  "Retirement",
  "Portfolio",
  "Cash",
  "Margin",
  "Private Equity",
  "Hedge Fund",
  "Venture Capital",
  "Real Estate",
  "Fixed Income",
  "Credit"
];

// Currencies with symbols
export const CURRENCIES = [
  "USD - US Dollar",
  "EUR - Euro",
  "GBP - British Pound",
  "CHF - Swiss Franc",
  "JPY - Japanese Yen",
  "CNY - Chinese Yuan",
  "CAD - Canadian Dollar",
  "AUD - Australian Dollar",
  "HKD - Hong Kong Dollar",
  "SGD - Singapore Dollar",
  "NZD - New Zealand Dollar",
  "SEK - Swedish Krona",
  "NOK - Norwegian Krone",
  "DKK - Danish Krone",
  "BRL - Brazilian Real",
  "INR - Indian Rupee",
  "MXN - Mexican Peso",
  "ZAR - South African Rand"
].sort();
