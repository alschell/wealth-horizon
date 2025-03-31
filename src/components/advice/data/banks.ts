
import { Bank } from "../types";
import { mockBrokers } from "../../trading/data/brokers";

// Convert brokers to banks with additional fields needed for banks
export const mockBanks: Bank[] = mockBrokers.map(broker => ({
  id: broker.id,
  name: broker.name,
  description: broker.description || "",
  services: ["Investment Advisory", "Wealth Management"],
  expertise: ["Global Markets", "Investment Strategy"],
  fee: broker.fee
}));
