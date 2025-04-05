
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Terminal, Search, Clock, BarChart3, DollarSign, TrendingUp, ArrowRight, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Command = {
  id: string;
  category: "trade" | "analysis" | "market" | "portfolio" | "recent";
  command: string;
  description: string;
};

const CommandPanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: "trade", name: "Trading", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "analysis", name: "Analysis", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "market", name: "Market", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "portfolio", name: "Portfolio", icon: <DollarSign className="h-4 w-4" /> },
    { id: "recent", name: "Recent", icon: <Clock className="h-4 w-4" /> },
  ];
  
  const commands: Command[] = [
    {
      id: "cmd-1",
      category: "trade",
      command: "Buy 1000 shares of Apple at market price",
      description: "Execute a market order to purchase 1000 shares of Apple Inc."
    },
    {
      id: "cmd-2",
      category: "trade",
      command: "Sell 500 shares of Microsoft at limit price $350",
      description: "Place a limit order to sell 500 shares of Microsoft at $350 per share"
    },
    {
      id: "cmd-3",
      category: "analysis",
      command: "Compare performance of tech stocks in my portfolio",
      description: "Analyze and compare the performance of all technology stocks you own"
    },
    {
      id: "cmd-4",
      category: "market",
      command: "Show market summary for European markets",
      description: "Display a summary of the current state of European markets"
    },
    {
      id: "cmd-5",
      category: "portfolio",
      command: "Show portfolio allocation by sector",
      description: "Display your portfolio's allocation across different sectors"
    },
    {
      id: "cmd-6",
      category: "portfolio",
      command: "Calculate portfolio risk metrics",
      description: "Analyze risk metrics including volatility, beta, and Sharpe ratio"
    },
    {
      id: "cmd-7",
      category: "market",
      command: "What are the biggest market movers today?",
      description: "Show the biggest percentage gainers and losers in the market today"
    },
    {
      id: "cmd-8",
      category: "analysis",
      command: "Who gave the best performing advice out of all my mandates?",
      description: "Compare the performance of different advisory mandates"
    },
    {
      id: "cmd-9",
      category: "recent",
      command: "What are the biggest risks for my portfolio?",
      description: "Identify key risk factors that could impact your portfolio"
    },
    {
      id: "cmd-10",
      category: "recent",
      command: "How should I use my excess cash?",
      description: "Get recommendations for optimizing uninvested cash"
    },
  ];
  
  const filteredCommands = commands.filter(cmd => {
    const matchesSearch = searchTerm === "" || 
      cmd.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === null || cmd.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleCommandClick = (command: Command) => {
    toast({
      title: "Executing Command",
      description: `Processing: ${command.command}`,
    });
    
    // In a real app, this would actually execute the command
  };
  
  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-full mr-3">
            <Terminal className="h-5 w-5 text-gray-600" />
          </div>
          <CardTitle className="text-base">Financial Commands</CardTitle>
        </div>
      </CardHeader>
      
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search commands..."
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge 
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          
          {categories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer flex items-center gap-1"
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              {category.icon}
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full">
          <div className="divide-y">
            {filteredCommands.length > 0 ? (
              filteredCommands.map(command => (
                <div 
                  key={command.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleCommandClick(command)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{command.command}</p>
                      <p className="text-xs text-gray-500 mt-1">{command.description}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="h-6 w-6 shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <Brain className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No commands found. Try a different search.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CommandPanel;
