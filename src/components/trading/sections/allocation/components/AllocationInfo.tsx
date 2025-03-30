
import React from "react";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface AllocationInfoProps {
  orderType: "buy" | "sell";
  quantity: number;
  totalAmount: number;
  currency: string;
}

const AllocationInfo: React.FC<AllocationInfoProps> = ({ 
  orderType, 
  quantity, 
  totalAmount, 
  currency 
}) => {
  return (
    <Card className="p-4 bg-blue-50 border-blue-100">
      <div className="flex items-start gap-2">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-blue-700 text-sm">
            {orderType === "buy" 
              ? `You're allocating ${quantity} shares with a total value of approximately ${totalAmount.toLocaleString('en-US', { style: 'currency', currency })}.`
              : `You're selling ${quantity} shares with expected proceeds of approximately ${totalAmount.toLocaleString('en-US', { style: 'currency', currency })}.`}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AllocationInfo;
