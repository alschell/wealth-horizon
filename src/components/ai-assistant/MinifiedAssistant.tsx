
import React from "react";
import { CardContent } from "@/components/ui/card";
import { TrendingUp, AlertTriangle, DollarSign } from "lucide-react";
import ChatInputForm from "./messages/ChatInputForm";
import { MessageType } from "./types";

interface MinifiedAssistantProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  messages?: MessageType[];
}

const MinifiedAssistant = ({ 
  input, 
  setInput, 
  handleSubmit,
  messages = []
}: MinifiedAssistantProps) => {
  // Find the most recent actionable recommendation
  const latestRecommendation = [...messages]
    .reverse()
    .find(msg => msg.type === "recommendation" && msg.actionable === true);

  // If no recommendation found, use a default one
  const recommendation = latestRecommendation || {
    category: "opportunity",
    text: "Tesla position up 15% this week. Consider taking profits."
  };

  // Choose the icon based on category
  const getIconForCategory = (category?: string) => {
    switch(category) {
      case "risk":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "cash":
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case "opportunity":
      default:
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    }
  };

  // Get a readable title for the category
  const getCategoryTitle = (category?: string) => {
    switch(category) {
      case "risk": return "Risk Alert";
      case "cash": return "Cash Management";
      case "market": return "Market Update";
      case "advice": return "Financial Advice";
      case "action": return "Action Required";
      case "opportunity":
      default: return "Opportunity";
    }
  };

  return (
    <CardContent className="p-4">
      <div className="mb-4">
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-1 mb-1">
            {getIconForCategory(recommendation.category)}
            <span className="text-xs font-medium">{getCategoryTitle(recommendation.category)}</span>
          </div>
          <p className="text-sm">{recommendation.text}</p>
        </div>
      </div>
      <ChatInputForm
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </CardContent>
  );
};

export default MinifiedAssistant;
