
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, TrendingUp, AlertTriangle, DollarSign, BarChart3, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type MessageType = {
  id: string;
  type: "user" | "system" | "recommendation";
  text: string;
  timestamp: Date;
  category?: "risk" | "opportunity" | "market" | "action" | "cash" | "advice";
  actionable?: boolean;
};

interface AIAssistantProps {
  minified?: boolean;
}

const AIAssistant = ({ minified = false }: AIAssistantProps) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [messages, setMessages] = useState<MessageType[]>([
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
  ]);
  
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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

  if (minified) {
    return (
      <CardContent className="p-4">
        <div className="mb-4">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-medium">Opportunity</span>
            </div>
            <p className="text-sm">Tesla position up 15% this week. Consider taking profits.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input 
            placeholder="Ask your AI assistant..." 
            className="text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    );
  }

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full mr-3">
            <Brain className="h-5 w-5 text-gray-600" />
          </div>
          <CardTitle className="text-base">AI Financial Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
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
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-3 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your portfolio or the market..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
