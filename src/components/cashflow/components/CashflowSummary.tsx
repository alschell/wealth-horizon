
import React from "react";
import { formatCurrency } from "@/lib/utils";

// Mock data
const summaryData = {
  inflows: [
    { source: "Investment Dividends", amount: 45000, currency: "USD", percentage: 35 },
    { source: "Rental Income", amount: 32000, currency: "USD", percentage: 25 },
    { source: "Business Distributions", amount: 28000, currency: "USD", percentage: 22 },
    { source: "Interest Income", amount: 18000, currency: "USD", percentage: 14 },
    { source: "Other Income", amount: 5000, currency: "USD", percentage: 4 },
  ],
  outflows: [
    { category: "Investment Contributions", amount: 60000, currency: "USD", percentage: 42 },
    { category: "Taxes", amount: 35000, currency: "USD", percentage: 25 },
    { category: "Property Expenses", amount: 18000, currency: "USD", percentage: 13 },
    { category: "Philanthropy", amount: 15000, currency: "USD", percentage: 11 },
    { category: "Living Expenses", amount: 12000, currency: "USD", percentage: 9 },
  ]
};

interface CashflowSummaryProps {
  type: "inflows" | "outflows";
}

const CashflowSummary: React.FC<CashflowSummaryProps> = ({ type }) => {
  const data = type === "inflows" ? summaryData.inflows : summaryData.outflows;
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const labelKey = type === "inflows" ? "source" : "category";

  return (
    <div>
      <div className="text-2xl font-bold mb-2">
        {formatCurrency(totalAmount)}
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{item[labelKey]}</span>
              <span className="font-medium">{formatCurrency(item.amount)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${type === "inflows" ? "bg-green-500" : "bg-red-500"}`} 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashflowSummary;
