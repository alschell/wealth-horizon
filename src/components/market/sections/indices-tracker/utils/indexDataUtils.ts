
import { IndexData } from "../types";

export const formatIndexValue = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercentageChange = (change: number): string => {
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
};

export const sortIndicesByName = (indices: IndexData[]): IndexData[] => {
  return [...indices].sort((a, b) => a.name.localeCompare(b.name));
};

export const filterIndicesByRegion = (indices: IndexData[], region: string): IndexData[] => {
  if (region === 'all') return indices;
  return indices.filter(index => index.region === region);
};

export const searchIndices = (indices: IndexData[], searchTerm: string): IndexData[] => {
  const term = searchTerm.toLowerCase();
  return indices.filter(index => 
    index.name.toLowerCase().includes(term) || 
    index.symbol.toLowerCase().includes(term) ||
    index.region?.toLowerCase().includes(term)
  );
};
