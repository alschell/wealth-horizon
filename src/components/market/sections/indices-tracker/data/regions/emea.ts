import { IndexData } from "../../types";

export const emeaIndices: IndexData[] = [
  {
    id: "ftse",
    name: "FTSE 100",
    symbol: "^FTSE",
    value: 7754.80,
    change: -0.32,
    percentChange: -0.32,
    region: "United Kingdom",
    exchange: "LSE",
    description: "The Financial Times Stock Exchange 100 Index is a share index of the 100 companies with the highest market capitalization listed on the London Stock Exchange.",
    volume: 1200000
  },
  {
    id: "dax",
    name: "DAX",
    symbol: "^GDAXI",
    value: 17967.87,
    change: -0.15,
    percentChange: -0.15,
    region: "Germany",
    exchange: "XETRA",
    description: "The DAX is the blue chip stock market index consisting of the 40 major German companies trading on the Frankfurt Stock Exchange.",
    volume: 1500000
  },
  {
    id: "cac",
    name: "CAC 40",
    symbol: "^FCHI",
    value: 7575.25,
    change: -0.28,
    percentChange: -0.28,
    region: "France",
    exchange: "Euronext",
    description: "The CAC 40 is a benchmark French stock market index representing a capitalization-weighted measure of the 40 most significant stocks among the 100 largest market caps on the Euronext Paris.",
    volume: 1300000
  },
  {
    id: "eurostoxx",
    name: "Euro Stoxx 50",
    symbol: "^STOXX50E",
    value: 4845.45,
    change: -0.12,
    percentChange: -0.12,
    region: "Europe",
    exchange: "STOXX",
    description: "The EURO STOXX 50 Index is a stock index of large Eurozone stocks.",
    volume: 1600000
  },
  {
    id: "ibex",
    name: "IBEX 35",
    symbol: "^IBEX",
    value: 10257.30,
    change: -0.22,
    percentChange: -0.22,
    region: "Spain",
    exchange: "BME",
    description: "The IBEX 35 is the benchmark stock market index of the Bolsa de Madrid, Spain's principal stock exchange.",
    volume: 900000
  },
  {
    id: "smi",
    name: "SMI",
    symbol: "^SSMI",
    value: 11865.50,
    change: 0.05,
    percentChange: 0.05,
    region: "Switzerland",
    exchange: "SIX",
    description: "The Swiss Market Index is Switzerland's blue-chip stock market index.",
    volume: 800000
  },
  {
    id: "ta125",
    name: "TA-125",
    symbol: "^TA125",
    value: 2145.65,
    change: 0.25,
    percentChange: 0.25,
    region: "Israel",
    exchange: "TASE",
    description: "The TA-125 Index is a stock market index of the 125 most highly capitalized companies listed on the Tel Aviv Stock Exchange.",
    volume: 500000
  },
];
