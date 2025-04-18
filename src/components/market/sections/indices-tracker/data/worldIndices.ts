
import { americasIndices } from './regions/americas';
import { emeaIndices } from './regions/emea';
import { apacIndices } from './regions/apac';

export const regionToCountryMap: Record<string, string[]> = {
  "ALL": ["All Regions"],
  "AMER": ["United States", "Canada", "Brazil", "Mexico", "Argentina"],
  "EMEA": ["United Kingdom", "Germany", "France", "Switzerland", "Spain", "Italy", "Netherlands", "Belgium", "Sweden", "Norway", "Russia", "South Africa", "Turkey", "Israel"],
  "APAC": ["Japan", "China", "Hong Kong", "South Korea", "Australia", "India", "Singapore", "Taiwan", "Indonesia", "Malaysia", "Thailand", "New Zealand"],
};

export const allWorldIndices = [
  ...americasIndices,
  ...emeaIndices,
  ...apacIndices
];
