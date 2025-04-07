
export type MessageType = {
  id: string;
  type: "user" | "system" | "recommendation";
  text: string;
  timestamp: Date;
  category?: "risk" | "opportunity" | "market" | "action" | "cash" | "advice";
  actionable?: boolean;
};
