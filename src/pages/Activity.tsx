
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { History, ArrowLeft, TrendingUp, DollarSign, CreditCard, Clock, FileText, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  date: string;
  type: "trade" | "deposit" | "withdrawal" | "login" | "document" | "credit" | "other";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Portfolio rebalanced",
    description: "Your investment portfolio was automatically rebalanced based on your risk profile.",
    timestamp: "Today at 9:45 AM",
    date: "2025-04-05",
    type: "trade",
  },
  {
    id: "2",
    title: "Cash deposit received",
    description: "Received $25,000.00 from Bank of America checking account.",
    timestamp: "Yesterday at 2:30 PM",
    date: "2025-04-04",
    type: "deposit",
  },
  {
    id: "3",
    title: "Login from new device",
    description: "New login detected from MacBook Pro (New York, USA).",
    timestamp: "Yesterday at 10:15 AM",
    date: "2025-04-04",
    type: "login",
  },
  {
    id: "4",
    title: "Bought 100 shares of AAPL",
    description: "Market order executed at $180.25 per share.",
    timestamp: "April 3 at 11:30 AM",
    date: "2025-04-03",
    type: "trade",
  },
  {
    id: "5",
    title: "Credit facility approved",
    description: "Your application for a $500,000 credit line was approved.",
    timestamp: "April 2 at 3:45 PM",
    date: "2025-04-02",
    type: "credit",
  },
  {
    id: "6",
    title: "Quarterly report downloaded",
    description: "Q1 2025 portfolio performance report was downloaded.",
    timestamp: "April 1 at 9:15 AM",
    date: "2025-04-01",
    type: "document",
  },
  {
    id: "7",
    title: "Withdrawal request processed",
    description: "Withdrawal of $50,000 to JPMorgan Chase account was processed.",
    timestamp: "March 31 at 2:20 PM",
    date: "2025-03-31",
    type: "withdrawal",
  },
  {
    id: "8",
    title: "Limit order set",
    description: "Limit order to sell 200 shares of TSLA at $225.00 was created.",
    timestamp: "March 30 at 10:40 AM",
    date: "2025-03-30",
    type: "trade",
  },
  {
    id: "9",
    title: "Password changed",
    description: "Your account password was updated successfully.",
    timestamp: "March 28 at 4:15 PM",
    date: "2025-03-28",
    type: "login",
  },
  {
    id: "10",
    title: "Tax document uploaded",
    description: "2024 W-9 form was uploaded to your account.",
    timestamp: "March 25 at 1:30 PM",
    date: "2025-03-25",
    type: "document",
  },
  {
    id: "11",
    title: "Automated investment executed",
    description: "Monthly automated investment of $5,000 to diversified ETF portfolio.",
    timestamp: "March 20 at 9:00 AM",
    date: "2025-03-20",
    type: "trade",
  },
  {
    id: "12",
    title: "Beneficiary updated",
    description: "Primary beneficiary information was updated on your account.",
    timestamp: "March 15 at 11:20 AM",
    date: "2025-03-15",
    type: "other",
  },
];

const Activity = () => {
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(mockActivities);

  const getIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-5 w-5 text-gray-500" />;
      case "deposit":
        return <DollarSign className="h-5 w-5 text-gray-500" />;
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

  React.useEffect(() => {
    filterActivities();
  }, [timeFilter, typeFilter]);

  const filterActivities = () => {
    let filtered = [...mockActivities];
    
    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter(activity => activity.type === typeFilter);
    }
    
    // Filter by time
    if (timeFilter === "today") {
      filtered = filtered.filter(activity => activity.timestamp.includes("Today"));
    } else if (timeFilter === "yesterday") {
      filtered = filtered.filter(activity => activity.timestamp.includes("Yesterday"));
    } else if (timeFilter === "week") {
      // This is simplified - in a real app you'd use date objects to check if within the last 7 days
      filtered = filtered.filter(activity => 
        activity.timestamp.includes("Today") || 
        activity.timestamp.includes("Yesterday") || 
        activity.timestamp.includes("April")
      );
    } else if (timeFilter === "month") {
      // Simplified for demo - would use proper date filtering in production
      filtered = filtered.filter(activity => 
        !activity.timestamp.includes("March") || 
        parseInt(activity.timestamp.split("March ")[1]) > 5
      );
    }
    
    setFilteredActivities(filtered);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.history.back()}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </div>
        
        <PageHeaderCard
          icon={History}
          title="Activity History"
          description="View your complete activity history across all accounts and services"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Period</label>
                  <Select 
                    value={timeFilter} 
                    onValueChange={setTimeFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Activity Type</label>
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activity</SelectItem>
                      <SelectItem value="trade">Trades</SelectItem>
                      <SelectItem value="deposit">Deposits</SelectItem>
                      <SelectItem value="withdrawal">Withdrawals</SelectItem>
                      <SelectItem value="login">Security</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    setTimeFilter("all");
                    setTypeFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">All Activities</span>
                    <Badge variant="outline">{mockActivities.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trading Activities</span>
                    <Badge variant="outline">{mockActivities.filter(a => a.type === "trade").length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Account Funding</span>
                    <Badge variant="outline">{mockActivities.filter(a => a.type === "deposit" || a.type === "withdrawal").length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Events</span>
                    <Badge variant="outline">{mockActivities.filter(a => a.type === "login").length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Activity History</CardTitle>
                  <Badge className="bg-gray-800">{filteredActivities.length} Activities</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-240px)]">
                  {filteredActivities.length > 0 ? (
                    <div className="space-y-4">
                      {filteredActivities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex items-start p-4 rounded-md bg-white border hover:bg-gray-50 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                            {getIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{activity.title}</h3>
                              <span className="text-sm text-gray-500">{activity.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No activities match the selected filters</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Activity;
