
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const CashflowHeader = () => {
  return (
    <Card className="mb-6">
      <CardContent className="flex items-center gap-3 p-6">
        <CircleDollarSign className="h-8 w-8 text-green-600" />
        <div>
          <h2 className="text-2xl font-bold">Cash Flow Management</h2>
          <p className="text-gray-500">Monitor and optimize your liquidity across multiple currencies</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowHeader;
