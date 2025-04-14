
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const CashflowHeader = () => {
  return (
    <Card className="mb-4">
      <CardContent className="py-4 flex items-center space-x-3">
        <CircleDollarSign className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-xl font-bold">Cashflow Management</h2>
          <p className="text-sm text-muted-foreground">Monitor and optimize your cash positions</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowHeader;
