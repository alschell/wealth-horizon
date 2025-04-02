
import React from "react";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

// Mock data for currency positions
const currencyPositions = [
  { 
    currency: "USD", 
    balance: 2500000, 
    target: 2000000, 
    status: "excess",
    recommendation: "Consider term deposit or investment"
  },
  { 
    currency: "EUR", 
    balance: 1500000, 
    target: 2000000, 
    status: "shortage",
    recommendation: "May need additional funds in 45 days"
  },
  { 
    currency: "GBP", 
    balance: 650000, 
    target: 500000, 
    status: "excess",
    recommendation: "Consider term deposit"
  },
  { 
    currency: "CHF", 
    balance: 900000, 
    target: 1000000, 
    status: "shortage",
    recommendation: "Close to target"
  },
  { 
    currency: "JPY", 
    balance: 85000000, 
    target: 80000000, 
    status: "excess",
    recommendation: "Within acceptable range"
  }
];

const CurrencyPositions = () => {
  return (
    <div className="space-y-4">
      {currencyPositions.map((position, index) => {
        const percentage = Math.round((position.balance / position.target) * 100);
        const isExcess = position.status === "excess";
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">{position.currency}</span>
                {isExcess ? (
                  <ArrowUpCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownCircle className="h-4 w-4 text-amber-500" />
                )}
                <Badge variant={isExcess ? "default" : "secondary"}>
                  {isExcess ? "Excess" : "Need more"}
                </Badge>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(position.balance, position.currency)}</div>
                <div className="text-xs text-muted-foreground">
                  Target: {formatCurrency(position.target, position.currency)}
                </div>
              </div>
            </div>
            
            <Progress value={percentage} className="h-2" />
            
            <div className="text-xs text-muted-foreground">
              {position.recommendation}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CurrencyPositions;
