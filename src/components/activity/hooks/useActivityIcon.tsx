
import { Clock, CreditCard, DollarSign, FileText, Lock, TrendingUp } from "lucide-react";

export const useActivityIcon = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-5 w-5 text-gray-500" />;
      case "deposit":
      case "withdrawal":
        return <DollarSign className="h-5 w-5 text-gray-500" />;
      case "login":
        return <Lock className="h-5 w-5 text-gray-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-gray-500" />;
      case "credit":
        return <CreditCard className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return { getIcon };
};
