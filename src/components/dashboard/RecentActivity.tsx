
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, DollarSign, Users, File, FileCheck, CreditCard, RefreshCcw, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionHeader from "./SectionHeader";

const RecentActivity = () => {
  const navigate = useNavigate();

  const activities = [
    { 
      id: "rebalance-01",
      title: "Portfolio rebalanced", 
      time: "Today at 09:45 AM",
      icon: <TrendingUp className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "deposit-01",
      title: "Cash deposit received", 
      time: "Yesterday at 2:30 PM",
      icon: <DollarSign className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "docs-01",
      title: "New tax documents uploaded", 
      time: "Yesterday at 11:20 AM",
      icon: <FileCheck className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "trade-01",
      title: "Trade executed: AAPL", 
      time: "2 days ago at 3:15 PM",
      icon: <ArrowUpRight className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "permission-01",
      title: "User permission updated", 
      time: "2 days ago at 10:45 AM",
      icon: <Users className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "loan-01",
      title: "Credit facility application submitted", 
      time: "3 days ago at 4:20 PM",
      icon: <CreditCard className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "trade-02",
      title: "Trade executed: TSLA", 
      time: "3 days ago at 11:30 AM",
      icon: <ArrowDownRight className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "report-01",
      title: "Monthly performance report generated", 
      time: "4 days ago at 9:00 AM",
      icon: <File className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "alert-01",
      title: "Market volatility alert", 
      time: "5 days ago at 2:45 PM",
      icon: <AlertTriangle className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "rebalance-02",
      title: "Strategy allocation adjusted", 
      time: "1 week ago at 10:30 AM",
      icon: <RefreshCcw className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "deposit-02",
      title: "Term deposit matured", 
      time: "1 week ago at 9:15 AM",
      icon: <DollarSign className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    },
    { 
      id: "trade-03",
      title: "Trade executed: GOOGL", 
      time: "1 week ago at 3:45 PM",
      icon: <ArrowUpRight className="h-4 w-4 text-[#4E46DC]" />,
      link: "/activity"
    }
  ];

  const handleActivityClick = (activityId: string) => {
    navigate("/activity");
  };

  return (
    <Card className="shadow-sm h-[350px]">
      <CardHeader className="pb-2">
        <SectionHeader title="Recent Activity" />
      </CardHeader>
      <CardContent className="p-6 pt-0 h-[calc(350px-80px)] flex flex-col">
        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div 
                key={index} 
                className="p-3 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleActivityClick(activity.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 flex items-center justify-center bg-gray-50 rounded-full">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="pt-4 mt-auto">
          <Link to="/activity">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
              View All Activity
              <ChevronRight className="h-4 w-4 ml-1 text-[#4E46DC]" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
