
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDollarSign, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

interface CashflowHeaderProps {
  totalIncome?: number;
  totalExpense?: number;
  netFlow?: number;
  currency?: string;
}

const CashflowStat: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClass?: string;
}> = ({ title, value, icon, colorClass = "text-gray-600" }) => (
  <div className="flex items-center gap-3">
    <div className={`rounded-full p-2 ${colorClass} bg-opacity-10`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const CashflowHeader: React.FC<CashflowHeaderProps> = ({
  totalIncome = 0,
  totalExpense = 0,
  netFlow = 0,
  currency = "USD"
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-primary" />
          Cash Flow Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CashflowStat
            title="Total Income"
            value={formatCurrency(totalIncome)}
            icon={<TrendingUp className="h-5 w-5" />}
            colorClass="text-green-600 bg-green-100"
          />
          
          <CashflowStat
            title="Total Expenses"
            value={formatCurrency(totalExpense)}
            icon={<TrendingDown className="h-5 w-5" />}
            colorClass="text-red-600 bg-red-100"
          />
          
          <CashflowStat
            title="Net Flow"
            value={formatCurrency(netFlow)}
            icon={<ArrowRight className="h-5 w-5" />}
            colorClass={netFlow >= 0 ? "text-blue-600 bg-blue-100" : "text-orange-600 bg-orange-100"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CashflowHeader;
