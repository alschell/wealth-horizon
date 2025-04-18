
// Legal entities for institutions (mapping)
export const LEGAL_ENTITIES: Record<string, string[]> = {
  "JP Morgan Chase": [
    "JPMORGAN CHASE BANK, N.A. NEW YORK",
    "JP MORGAN SECURITIES LLC",
    "J.P. MORGAN SECURITIES PLC",
    "JPMORGAN ASSET MANAGEMENT (UK) LIMITED",
    "J.P. MORGAN EUROPE LIMITED",
    "JPMORGAN ASSET MANAGEMENT (EUROPE) S.À R.L."
  ],
  "Goldman Sachs": [
    "GOLDMAN SACHS BANK USA",
    "GOLDMAN SACHS & CO. LLC",
    "GOLDMAN SACHS INTERNATIONAL",
    "GOLDMAN SACHS ASSET MANAGEMENT, L.P.",
    "GOLDMAN SACHS INTERNATIONAL BANK",
    "GOLDMAN SACHS PARIS INC. ET CIE"
  ],
  "Morgan Stanley": [
    "MORGAN STANLEY BANK, N.A.",
    "MORGAN STANLEY & CO. LLC",
    "MORGAN STANLEY SMITH BARNEY LLC",
    "MORGAN STANLEY INVESTMENT MANAGEMENT INC.",
    "MORGAN STANLEY INTERNATIONAL HOLDINGS INC.",
    "MORGAN STANLEY CAPITAL SERVICES LLC"
  ],
  "Bank of America": [
    "BANK OF AMERICA, N.A.",
    "MERRILL LYNCH, PIERCE, FENNER & SMITH INCORPORATED",
    "BofA SECURITIES, INC.",
    "BANK OF AMERICA EUROPE DESIGNATED ACTIVITY COMPANY",
    "BANC OF AMERICA SECURITIES LIMITED",
    "BA CONTINUUM INDIA PRIVATE LIMITED"
  ],
  "Wells Fargo": [
    "WELLS FARGO BANK, N.A.",
    "WELLS FARGO SECURITIES, LLC",
    "WELLS FARGO CLEARING SERVICES, LLC",
    "WELLS FARGO FUNDS MANAGEMENT, LLC",
    "WELLS FARGO BANK INTERNATIONAL UC",
    "WELLS FARGO SECURITIES INTERNATIONAL LIMITED"
  ],
  "Citigroup": [
    "CITIBANK, N.A.",
    "CITIGROUP GLOBAL MARKETS INC.",
    "CITIGROUP GLOBAL MARKETS LIMITED",
    "CITIGROUP GLOBAL MARKETS EUROPE AG",
    "CITIGROUP GLOBAL MARKETS JAPAN INC.",
    "CITIGROUP TECHNOLOGY, INC."
  ],
  "UBS Group": [
    "UBS AG",
    "UBS FINANCIAL SERVICES INC.",
    "UBS SECURITIES LLC",
    "UBS ASSET MANAGEMENT (AMERICAS) INC.",
    "UBS SWITZERLAND AG",
    "UBS EUROPE SE"
  ],
  "Credit Suisse": [
    "CREDIT SUISSE AG",
    "CREDIT SUISSE SECURITIES (USA) LLC",
    "CREDIT SUISSE INTERNATIONAL",
    "CREDIT SUISSE ASSET MANAGEMENT, LLC",
    "CREDIT SUISSE (SWITZERLAND) LTD.",
    "CREDIT SUISSE SECURITIES (EUROPE) LIMITED"
  ],
  "HSBC Holdings": [
    "HSBC BANK PLC",
    "HSBC SECURITIES (USA) INC.",
    "HSBC BANK USA, N.A.",
    "HSBC GLOBAL ASSET MANAGEMENT LIMITED",
    "HSBC CONTINENTAL EUROPE",
    "HSBC TRINKAUS & BURKHARDT AG"
  ],
  "BNP Paribas": [
    "BNP PARIBAS",
    "BNP PARIBAS SECURITIES CORP.",
    "BNP PARIBAS ASSET MANAGEMENT FRANCE",
    "BNP PARIBAS S.A.",
    "BNP PARIBAS FORTIS SA/NV",
    "BNP PARIBAS SECURITIES SERVICES"
  ],
  "Deutsche Bank": [
    "DEUTSCHE BANK AG",
    "DEUTSCHE BANK SECURITIES INC.",
    "DEUTSCHE BANK TRUST COMPANY AMERICAS",
    "DWS INVESTMENT GMBH",
    "DEUTSCHE BANK LUXEMBOURG S.A.",
    "DEUTSCHE ASSET MANAGEMENT INVESTMENT GMBH"
  ],
  "Barclays": [
    "BARCLAYS BANK PLC",
    "BARCLAYS CAPITAL INC.",
    "BARCLAYS CAPITAL SECURITIES LIMITED",
    "BARCLAYS INVESTMENT SOLUTIONS LIMITED",
    "BARCLAYS BANK IRELAND PLC",
    "BARCLAYS BANK UK PLC"
  ],
  "State Street Corporation": [
    "STATE STREET BANK AND TRUST COMPANY",
    "STATE STREET GLOBAL ADVISORS LIMITED",
    "STATE STREET GLOBAL ADVISORS TRUST COMPANY",
    "STATE STREET BANK INTERNATIONAL GMBH",
    "STATE STREET FUND SERVICES TORONTO INC.",
    "STATE STREET INTERNATIONAL HOLDINGS"
  ],
  "Bank of New York Mellon": [
    "THE BANK OF NEW YORK MELLON",
    "BNY MELLON CAPITAL MARKETS, LLC",
    "BNY MELLON INVESTMENT MANAGEMENT",
    "THE BANK OF NEW YORK MELLON SA/NV",
    "BNY MELLON INVESTMENT ADVISER, INC.",
    "BNY MELLON INTERNATIONAL LIMITED"
  ],
  "Northern Trust": [
    "NORTHERN TRUST COMPANY",
    "NORTHERN TRUST SECURITIES, INC.",
    "NORTHERN TRUST GLOBAL INVESTMENTS LIMITED",
    "NORTHERN TRUST ASSET MANAGEMENT",
    "NORTHERN TRUST GLOBAL SERVICES SE",
    "NORTHERN OPERATING SERVICES PRIVATE LIMITED"
  ],
  "BlackRock": [
    "BLACKROCK FINANCIAL MANAGEMENT, INC.",
    "BLACKROCK FUND ADVISORS",
    "BLACKROCK ADVISORS, LLC",
    "BLACKROCK INTERNATIONAL LIMITED",
    "BLACKROCK ASSET MANAGEMENT IRELAND LIMITED",
    "BLACKROCK INVESTMENT MANAGEMENT, LLC"
  ],
  "Vanguard Group": [
    "VANGUARD MARKETING CORPORATION",
    "THE VANGUARD GROUP, INC.",
    "VANGUARD INVESTMENTS UK, LIMITED",
    "VANGUARD ASSET MANAGEMENT, LIMITED",
    "VANGUARD INVESTMENTS HONG KONG LIMITED",
    "VANGUARD INVESTMENTS AUSTRALIA LTD"
  ],
  "Fidelity Investments": [
    "FIDELITY BROKERAGE SERVICES LLC",
    "FIDELITY MANAGEMENT & RESEARCH COMPANY LLC",
    "FIDELITY INVESTMENTS INSTITUTIONAL SERVICES COMPANY, INC.",
    "FMR INVESTMENT MANAGEMENT (UK) LIMITED",
    "FIDELITY MANAGEMENT & RESEARCH (JAPAN) LIMITED",
    "FIDELITY DISTRIBUTORS COMPANY LLC"
  ],
  "Charles Schwab": [
    "CHARLES SCHWAB & CO., INC.",
    "CHARLES SCHWAB BANK, SSB",
    "CHARLES SCHWAB INVESTMENT MANAGEMENT, INC.",
    "TD AMERITRADE, INC.",
    "TD AMERITRADE CLEARING, INC.",
    "CHARLES SCHWAB FUTURES AND FOREX LLC"
  ],
  "Other": ["Other Legal Entity"]
};

// Ensure no institution has an empty array of legal entities
export const ensureAllInstitutionsHaveLegalEntities = (institutions: string[]): Record<string, string[]> => {
  const result = { ...LEGAL_ENTITIES };
  
  // Add at least one default legal entity for each institution that doesn't have any
  institutions.forEach(institution => {
    if (!result[institution]) {
      result[institution] = [`${institution} Default Legal Entity`];
    }
  });
  
  return result;
};
