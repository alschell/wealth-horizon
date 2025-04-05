
import React from "react";
import { CreditCard, TrendingUp, UserPlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Trade",
    description: "Buy or sell securities",
    icon: <TrendingUp className="h-6 w-6" />,
    action: () => console.log("Trade action clicked"),
  },
  {
    title: "Apply for Credit",
    description: "Request new credit facilities",
    icon: <CreditCard className="h-6 w-6" />,
    action: () => console.log("Apply for credit clicked"),
  },
  {
    title: "Invite User",
    description: "Add team members",
    icon: <UserPlus className="h-6 w-6" />,
    action: () => console.log("Invite user clicked"),
  },
  {
    title: "View Reports",
    description: "Access financial reports",
    icon: <FileText className="h-6 w-6" />,
    action: () => console.log("View reports clicked"),
  },
];

const QuickActions = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto py-4 px-5 flex flex-col items-center justify-center hover-lift bg-white border rounded-xl shadow-sm"
            onClick={action.action}
          >
            <div className="p-3 rounded-full bg-gray-100 mb-3">
              {action.icon}
            </div>
            <span className="text-base font-medium">{action.title}</span>
            <span className="text-xs text-gray-500 mt-1">{action.description}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
