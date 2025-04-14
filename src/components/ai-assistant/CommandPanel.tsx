
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Circle, TrendingUp, ChevronRight, ArrowRight, DollarSign, AlertTriangle } from "@/utils/icons";

interface CommandPanelProps {
  onActionClick: (action: string) => void;
}

const CommandPanel: React.FC<CommandPanelProps> = ({ onActionClick }) => {
  const commands = [
    {
      title: "Analyze Portfolio",
      description: "Get a detailed analysis of your current portfolio allocation",
      icon: <TrendingUp className="h-4 w-4 text-gray-600" />,
      action: "analyze_portfolio"
    },
    {
      title: "Optimize Cash",
      description: "Review and optimize your cash positions across currencies",
      icon: <DollarSign className="h-4 w-4 text-gray-600" />,
      action: "optimize_cash"
    },
    {
      title: "Risk Assessment",
      description: "Identify potential risks in your current investment strategy",
      icon: <AlertTriangle className="h-4 w-4 text-gray-600" />,
      action: "risk_assessment"
    }
  ];
  
  return (
    <Card className="p-4">
      <h3 className="font-medium mb-3">Quick Actions</h3>
      <div className="space-y-2">
        {commands.map((command, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex items-start justify-between w-full p-3 h-auto font-normal"
            onClick={() => onActionClick(command.action)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">{command.icon}</div>
              <div className="text-left">
                <p className="font-medium text-sm">{command.title}</p>
                <p className="text-xs text-gray-500 mt-1">{command.description}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 mt-1 ml-2" />
          </Button>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <p className="text-xs text-gray-500 mb-2">Try asking</p>
        <div className="grid gap-2">
          <Button variant="ghost" className="justify-start h-8 px-2 text-xs text-gray-600" onClick={() => onActionClick("prompt_performance")}>
            <Circle className="h-1.5 w-1.5 mr-2" />
            <span>How has my portfolio performed this month?</span>
          </Button>
          <Button variant="ghost" className="justify-start h-8 px-2 text-xs text-gray-600" onClick={() => onActionClick("prompt_allocation")}>
            <Circle className="h-1.5 w-1.5 mr-2" />
            <span>Suggest an optimal asset allocation</span>
          </Button>
          <Button variant="ghost" className="justify-start h-8 px-2 text-xs text-gray-600" onClick={() => onActionClick("prompt_cash")}>
            <Circle className="h-1.5 w-1.5 mr-2" />
            <span>What should I do with excess cash?</span>
          </Button>
        </div>
      </div>
      
      <Button variant="link" className="w-full mt-2 text-xs" onClick={() => onActionClick("more_examples")}>
        <span>More examples</span>
        <ArrowRight className="h-3 w-3 ml-1" />
      </Button>
    </Card>
  );
};

export default CommandPanel;
