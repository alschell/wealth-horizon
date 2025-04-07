
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "../types";

const initialMessages: MessageType[] = [
  {
    id: "welcome",
    type: "system",
    text: "Welcome to your AI Financial Assistant. I can provide portfolio recommendations, market insights, and help you execute financial actions. What would you like to do today?",
    timestamp: new Date(),
  },
  {
    id: "rec-1",
    type: "recommendation",
    text: "Your Tesla position has increased by 15% in the last week. Consider taking some profits.",
    timestamp: new Date(),
    category: "opportunity",
    actionable: true,
  },
  {
    id: "rec-2",
    type: "recommendation",
    text: "Market volatility is increasing. Your portfolio has higher than usual exposure to technology stocks.",
    timestamp: new Date(),
    category: "risk",
    actionable: false,
  },
  {
    id: "rec-3",
    type: "recommendation",
    text: "You have $1.5M in uninvested cash. Consider allocating to fixed income to improve yield.",
    timestamp: new Date(),
    category: "cash",
    actionable: true,
  },
];

export const useAIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const { toast } = useToast();

  const handleActionClick = (message: MessageType) => {
    if (message.category === "opportunity" || message.text.includes("Tesla")) {
      toast({
        title: "Action Initiated",
        description: "Opening trade interface to execute Tesla transaction",
      });
    } else if (message.category === "cash") {
      toast({
        title: "Cash Management",
        description: "Opening cash allocation interface",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessage: MessageType = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      let responseText = "";
      let category: MessageType["category"] = undefined;
      let actionable = false;
      
      if (input.toLowerCase().includes("buy") && input.toLowerCase().includes("tesla")) {
        responseText = "I've prepared a trade order for 500,000 Tesla shares at market price. Would you like me to execute this trade now?";
        category = "action";
        actionable = true;
      } else if (input.toLowerCase().includes("best performing") && input.toLowerCase().includes("advice")) {
        responseText = "Based on 12-month performance, your mandate with Goldman Sachs has outperformed others with a return of 14.2%, compared to the average of 8.7% across all mandates.";
        category = "advice";
      } else if (input.toLowerCase().includes("risk")) {
        responseText = "The primary risks in your portfolio are: 1) Overexposure to technology sector (32% vs. benchmark 22%), 2) Concentration risk with Apple comprising 8% of total holdings, and 3) Higher than average currency risk due to unhedged positions in emerging markets.";
        category = "risk";
      } else if (input.toLowerCase().includes("cash") || input.toLowerCase().includes("liquidity")) {
        responseText = "You currently have $4.2M in cash across all accounts. Based on your historical cash needs and upcoming commitments, I recommend maintaining $1.5M as a reserve and investing $2.7M in short-term treasury bills to improve yield while maintaining liquidity.";
        category = "cash";
        actionable = true;
      } else if (input.toLowerCase().includes("market") || input.toLowerCase().includes("summary")) {
        responseText = "Market Summary: S&P 500 +0.4% today, led by technology and healthcare. European markets mixed with DAX -0.2%. Asian markets closed higher with Nikkei +1.2%. US 10Y yield at 4.32%, down 3bps. USD strengthening against major currencies. Commodities show oil +1.1%, gold -0.3%.";
        category = "market";
      } else {
        responseText = "I understand you're asking about " + input + ". Let me analyze your portfolio and market conditions to provide a tailored response. What specific aspect would you like me to focus on?";
      }
      
      const aiResponse: MessageType = {
        id: (Date.now() + 1).toString(),
        type: "system",
        text: responseText,
        timestamp: new Date(),
        category,
        actionable,
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return {
    input,
    setInput,
    messages,
    handleActionClick,
    handleSubmit
  };
};
