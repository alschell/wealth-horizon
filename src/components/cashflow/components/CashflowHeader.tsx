
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const CashflowHeader = () => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <CircleDollarSign className="h-8 w-8 text-green-700" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Manage Cashflow & Liquidity</h1>
            <p className="text-muted-foreground max-w-3xl">
              Monitor your cash flow, plan future liquidity needs, manage recurring payments, 
              and optimize idle funds with competitive term deposits.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowHeader;
