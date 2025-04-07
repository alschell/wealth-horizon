
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
    } else if (message.category === "risk") {
      toast({
        title: "Risk Management",
        description: "Opening risk assessment dashboard",
      });
    } else if (message.category === "market") {
      toast({
        title: "Market Analysis",
        description: "Opening detailed market analysis view",
      });
    } else if (message.category === "advice") {
      toast({
        title: "Financial Advice",
        description: "Preparing personalized financial recommendations",
      });
    }
  };

  const getResponseForMarketQuery = (query: string) => {
    if (query.includes("summary") || query.includes("overview")) {
      return "Market Summary: S&P 500 +0.4% today, led by technology and healthcare. European markets mixed with DAX -0.2%. Asian markets closed higher with Nikkei +1.2%. US 10Y yield at 4.32%, down 3bps. USD strengthening against major currencies. Commodities show oil +1.1%, gold -0.3%.";
    } else if (query.includes("forecast") || query.includes("prediction")) {
      return "Market Forecast: Economic indicators suggest moderate growth in the coming quarter. Consensus expectations point to continued corporate earnings growth of 5-7%. Inflation pressures are expected to ease by Q3. Key risks include geopolitical tensions and central bank policy shifts.";
    } else if (query.includes("sector") || query.includes("industry")) {
      return "Sector Performance (Last Month): Technology +3.8%, Healthcare +2.5%, Financials +1.2%, Energy -1.3%, Consumer Discretionary +0.7%, Consumer Staples +0.3%, Industrials +1.8%, Materials -0.5%, Utilities -0.8%, Real Estate +0.2%, Communication Services +2.1%.";
    } else {
      return `Market Analysis: Based on current conditions, market sentiment appears ${Math.random() > 0.5 ? 'cautiously optimistic' : 'somewhat risk-averse'} with volatility measures ${Math.random() > 0.5 ? 'decreasing' : 'increasing'} over the past week. Key sectors to watch include technology, healthcare, and financials.`;
    }
  };

  const getResponseForPortfolioQuery = (query: string) => {
    if (query.includes("performance") || query.includes("return")) {
      return "Portfolio Performance: Your portfolio has returned 8.2% YTD compared to benchmark return of 6.5%. Top contributors include: Apple (+15.3%), Nvidia (+28.7%), and Microsoft (+12.1%). Underperformers include: Tesla (-5.2%), AT&T (-3.8%), and Intel (-7.1%).";
    } else if (query.includes("risk") || query.includes("volatility")) {
      return "Risk Assessment: Your portfolio has a beta of 1.15 (higher volatility than market). Sharpe ratio: 0.78 (moderate risk-adjusted returns). Value at Risk (95%): 2.3% daily. Primary risk factors: Tech sector concentration (32% of holdings), emerging market exposure (18%), and growth stock bias.";
    } else if (query.includes("allocation") || query.includes("composition")) {
      return "Portfolio Allocation: Equities 65% (US: 42%, International Developed: 15%, Emerging: 8%), Fixed Income 20% (Government: 8%, Corporate: 7%, High Yield: 5%), Alternatives 10% (Real Estate: 6%, Commodities: 4%), Cash 5%.";
    } else {
      return "Portfolio Overview: Your $4.8M portfolio shows moderate diversification with slight overweight to technology and healthcare sectors. Short-term performance is +3.2% (last 30 days), with YTD return of 8.2%. Risk metrics indicate slightly higher volatility than benchmark. 5 actionable recommendations available for portfolio optimization.";
    }
  };

  const getResponseForWealthQuery = (query: string) => {
    if (query.includes("tax") || query.includes("taxes")) {
      return "Tax Planning Opportunities: 1) Harvest losses in underperforming positions to offset capital gains (~$35,000 potential tax savings), 2) Consider municipal bonds for tax-exempt income in your high tax bracket, 3) Review timing of charitable contributions for maximum deduction impact, 4) Evaluate Roth conversion opportunities during this year's lower income period.";
    } else if (query.includes("estate") || query.includes("legacy")) {
      return "Estate Planning Analysis: Your current plan needs updating to reflect recent legislative changes. Key recommendations: 1) Review trust structures to optimize exemption amounts, 2) Update beneficiary designations across all accounts, 3) Consider generation-skipping strategies for grandchildren's education funding, 4) Evaluate charitable remainder trust options for dual tax and legacy benefits.";
    } else if (query.includes("retirement") || query.includes("pension")) {
      return "Retirement Projection: Based on current savings rate and portfolio allocation, you're on track to meet 92% of your retirement income goal. Increasing annual contributions by $25,000 or adjusting allocation to include more growth assets could close this gap. Social Security optimization strategies could add approximately $120,000 in lifetime benefits.";
    } else {
      return "Wealth Management Overview: Your financial position shows strong fundamentals with net worth of $12.4M. Asset allocation is generally aligned with long-term goals, though retirement funding is currently tracking slightly below target (92%). Key opportunities exist in tax optimization, estate planning updates, and cash deployment strategies.";
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
      
      const userQuery = input.toLowerCase();
      
      // Buy/Sell specific stock response
      if ((userQuery.includes("buy") || userQuery.includes("sell") || userQuery.includes("trade")) && 
          (userQuery.includes("stock") || userQuery.includes("tesla") || userQuery.includes("apple") || userQuery.includes("amazon"))) {
        responseText = "I've prepared a trade order based on your request. Would you like me to execute this trade now?";
        category = "action";
        actionable = true;
      } 
      // Market-related queries
      else if (userQuery.includes("market") || userQuery.includes("index") || userQuery.includes("s&p") || 
               userQuery.includes("nasdaq") || userQuery.includes("dow")) {
        responseText = getResponseForMarketQuery(userQuery);
        category = "market";
      } 
      // Portfolio-related queries
      else if (userQuery.includes("portfolio") || userQuery.includes("holdings") || userQuery.includes("investments") || 
               userQuery.includes("stocks") || userQuery.includes("bonds")) {
        responseText = getResponseForPortfolioQuery(userQuery);
        category = userQuery.includes("risk") ? "risk" : "advice";
        actionable = userQuery.includes("allocation") || userQuery.includes("optimization");
      } 
      // Cash/Liquidity queries
      else if (userQuery.includes("cash") || userQuery.includes("liquidity") || userQuery.includes("money") || 
               userQuery.includes("deposit") || userQuery.includes("withdraw")) {
        responseText = "Cash Position Analysis: You currently have $4.2M in cash across all accounts. Based on your historical cash needs and upcoming commitments, I recommend maintaining $1.5M as a reserve and investing $2.7M in short-term treasury bills to improve yield while maintaining liquidity.";
        category = "cash";
        actionable = true;
      } 
      // Wealth management queries
      else if (userQuery.includes("wealth") || userQuery.includes("financial plan") || userQuery.includes("tax") || 
               userQuery.includes("estate") || userQuery.includes("retirement")) {
        responseText = getResponseForWealthQuery(userQuery);
        category = "advice";
        actionable = userQuery.includes("opportunities") || userQuery.includes("recommendations");
      } 
      // Best performing investments
      else if (userQuery.includes("best performing") || userQuery.includes("top") || userQuery.includes("highest")) {
        responseText = "Best Performing Investments: 1) Nvidia: +68.3% (1-year return), 2) Eli Lilly: +42.6%, 3) Microsoft: +31.8%, 4) Alphabet: +28.4%, 5) Amazon: +26.1%. These positions represent 18.2% of your total portfolio value.";
        category = "opportunity";
        actionable = true;
      } 
      // Worst performing investments
      else if (userQuery.includes("worst performing") || userQuery.includes("bottom") || userQuery.includes("lowest")) {
        responseText = "Underperforming Investments: 1) Intel: -18.3% (1-year return), 2) Verizon: -12.6%, 3) AT&T: -8.7%, 4) ExxonMobil: -3.2%, 5) Pfizer: -2.9%. These positions represent 7.4% of your total portfolio value. Would you like me to analyze if any should be sold?";
        category = "risk";
        actionable = true;
      }
      // ESG/Sustainable investing
      else if (userQuery.includes("esg") || userQuery.includes("sustainable") || userQuery.includes("impact") || 
               userQuery.includes("ethical") || userQuery.includes("green")) {
        responseText = "ESG Portfolio Analysis: Your portfolio currently scores 72/100 on ESG metrics (above average). 28% of holdings meet strict ESG criteria. Key contributors: Renewable energy ETFs (12% of portfolio), Microsoft (strong governance), Tesla (environmental impact). Detractors: Energy sector exposure (8%), certain consumer goods companies with supply chain concerns.";
        category = "advice";
        actionable = false;
      }
      // Default response if no specific pattern is matched
      else {
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
