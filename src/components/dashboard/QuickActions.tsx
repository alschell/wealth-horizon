
import React from "react";
import { CreditCard, TrendingUp, UserPlus, FileText, Brain, MessageSquare, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const defaultActions = [
  {
    id: "trade",
    title: "Trade",
    description: "Buy or sell securities",
    icon: <TrendingUp className="h-6 w-6" />,
    path: "/trading",
  },
  {
    id: "credit",
    title: "Apply for Credit",
    description: "Request new credit facilities",
    icon: <CreditCard className="h-6 w-6" />,
    path: "/dashboard/credit",
  },
  {
    id: "invite",
    title: "Invite User",
    description: "Add team members",
    icon: <UserPlus className="h-6 w-6" />,
    path: "/dashboard/users",
  },
  {
    id: "reports",
    title: "View Reports",
    description: "Access financial reports",
    icon: <FileText className="h-6 w-6" />,
    path: "/reporting",
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Get financial recommendations",
    icon: <Brain className="h-6 w-6" />,
    path: "/ai-assistant",
  },
  {
    id: "chat",
    title: "Financial Chat",
    description: "Ask questions and execute actions",
    icon: <MessageSquare className="h-6 w-6" />,
    path: "/financial-chat",
  },
  {
    id: "borrow",
    title: "Borrow from Facility",
    description: "Access available credit",
    icon: <Wallet className="h-6 w-6" />,
    path: "/borrow",
  }
];

const QuickActions = () => {
  const navigate = useNavigate();
  const [actions, setActions] = React.useState(() => {
    const savedActions = localStorage.getItem("quickAccessActions");
    return savedActions ? JSON.parse(savedActions) : defaultActions.slice(0, 4);
  });
  
  const [showCustomize, setShowCustomize] = React.useState(false);
  
  const toggleAction = (action) => {
    setActions(current => {
      const exists = current.some(a => a.id === action.id);
      
      let newActions;
      if (exists) {
        newActions = current.filter(a => a.id !== action.id);
      } else {
        newActions = [...current, action];
      }
      
      localStorage.setItem("quickAccessActions", JSON.stringify(newActions));
      return newActions;
    });
  };
  
  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowCustomize(!showCustomize)}
        >
          {showCustomize ? "Done" : "Customize"}
        </Button>
      </div>
      
      {showCustomize ? (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="text-sm font-medium mb-3">Select actions to display:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {defaultActions.map((action) => (
              <div 
                key={action.id} 
                className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                  actions.some(a => a.id === action.id) 
                    ? "border-primary bg-primary/10" 
                    : "border-gray-200"
                }`}
                onClick={() => toggleAction(action)}
              >
                <div className={`p-2 rounded-full mr-3 ${
                  actions.some(a => a.id === action.id) 
                    ? "bg-primary/20" 
                    : "bg-gray-100"
                }`}>
                  {action.icon}
                </div>
                <div>
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            You can select up to 4 actions to display on your dashboard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto py-4 px-5 flex flex-col items-center justify-center hover-lift bg-white border rounded-xl shadow-sm"
              onClick={() => handleActionClick(action.path)}
            >
              <div className="p-3 rounded-full bg-gray-100 mb-3">
                {action.icon}
              </div>
              <span className="text-base font-medium">{action.title}</span>
              <span className="text-xs text-gray-500 mt-1">{action.description}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickActions;
