
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageType } from "../types";
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  BarChart3, 
  Send, 
  Brain 
} from "@/utils/icons";

interface MessageItemProps {
  message: MessageType;
  handleActionClick: (message: MessageType) => void;
}

const MessageItem = ({ message, handleActionClick }: MessageItemProps) => {
  const getCategoryIcon = (category?: string) => {
    switch(category) {
      case "risk": return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "opportunity": return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "market": return <BarChart3 className="h-4 w-4 text-blue-500" />;
      case "action": return <Send className="h-4 w-4 text-purple-500" />;
      case "cash": return <DollarSign className="h-4 w-4 text-green-500" />;
      case "advice": return <Brain className="h-4 w-4 text-indigo-500" />;
      default: return null;
    }
  };

  return (
    <div
      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          message.type === "user"
            ? "bg-primary text-primary-foreground"
            : message.type === "recommendation"
            ? "bg-gray-50 border border-gray-200"
            : "bg-gray-100"
        }`}
      >
        {message.type === "recommendation" && (
          <div className="flex items-center gap-1 mb-1">
            {getCategoryIcon(message.category)}
            <span className="text-xs font-medium">
              {message.category === "risk" && "Risk Alert"}
              {message.category === "opportunity" && "Opportunity"}
              {message.category === "cash" && "Cash Management"}
            </span>
          </div>
        )}
        
        <p className="text-sm">{message.text}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {message.actionable && (
            <Button 
              size="sm" 
              variant="outline" 
              className="text-xs h-7 ml-auto"
              onClick={() => handleActionClick(message)}
            >
              Take Action
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
