
import React from "react";
import { UseFormWatch } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";
import { FormValues } from "./FormSchema";

interface DepositSummaryProps {
  watch: UseFormWatch<FormValues>;
  rate: number;
  estimatedInterest: number;
}

const DepositSummary: React.FC<DepositSummaryProps> = ({
  watch,
  rate,
  estimatedInterest,
}) => {
  const watchAmount = watch("amount");
  const watchCurrency = watch("currency");

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
      <h3 className="font-medium mb-3">Deposit Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Interest Rate:</span>
          <span className="font-medium">{rate}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Estimated Interest:</span>
          <span className="font-semibold text-green-600">{formatCurrency(estimatedInterest, watchCurrency)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Total at Maturity:</span>
          <span className="font-semibold">{formatCurrency(watchAmount + estimatedInterest, watchCurrency)}</span>
        </div>
      </div>
    </div>
  );
};

export default DepositSummary;
