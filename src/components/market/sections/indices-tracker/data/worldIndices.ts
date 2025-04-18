
import { IndexData } from "../types";
import { americasIndices } from "./regions/americas";
import { apacIndices } from "./regions/apac";
import { emeaIndices } from "./regions/emea";

export const allWorldIndices: IndexData[] = [
  ...americasIndices,
  ...apacIndices,
  ...emeaIndices
];
