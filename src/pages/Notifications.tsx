
import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Bell, Calendar, CheckCircle, CreditCard, FileText, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "trade" | "credit" | "alert" | "appointment" | "task" | "event";
  status: "read" | "unread" | "completed" | "pending";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Trade Executed",
    description: "Your order to buy 100 shares of AAPL has been executed at $150.25 per share.",
    timestamp: "2 hours ago",
    type: "trade",
    status: "unread",
  },
  {
    id: "2",
    title: "Review Portfolio Allocation",
    description: "Task: Review and approve the new portfolio allocation strategy before market close today.",
    timestamp: "Today",
    type: "task",
    status: "pending",
  },
  {
    id: "3",
    title: "Credit Application Approved",
    description: "Your application for a new credit line has been approved with a limit of $250,000.",
    timestamp: "Yesterday",
    type: "credit",
    status: "read",
  },
  {
    id: "4",
    title: "Quarterly Review Meeting",
    description: "Event: Your quarterly financial review is scheduled for June 15 at 10:00 AM EST.",
    timestamp: "1 week ago",
    type: "event",
    status: "pending",
  },
  {
    id: "5",
    title: "Portfolio Alert",
    description: "Your portfolio has increased by 5% this month, outperforming the benchmark by 2.3%.",
    timestamp: "2 days ago",
    type: "alert",
    status: "read",
  },
  {
    id: "6",
    title: "Document Signature Required",
    description: "Task: Please sign the updated investment mandate document by end of week.",
    timestamp: "3 days ago",
    type: "task",
    status: "pending",
  },
  {
    id: "7",
    title: "Market Volatility Alert",
    description: "Increased volatility detected in technology sector. Consider reviewing your exposure.",
    timestamp: "5 days ago",
    type: "alert",
    status: "read",
  },
  {
    id: "8",
    title: "New Research Report Available",
    description: "A new research report on emerging markets is available for your review.",
    timestamp: "1 week ago",
    type: "event",
    status: "read",
  },
  {
    id: "9",
    title: "Dividend Payment Received",
    description: "Dividend payment of $3,245.67 has been credited to your account.",
    timestamp: "2 weeks ago",
    type: "credit",
    status: "read",
  },
  {
    id: "10",
    title: "Tax Document Available",
    description: "Your annual tax statement is now available for download.",
    timestamp: "1 month ago",
    type: "event",
    status: "read",
  },
  {
    id: "11",
    title: "Portfolio Rebalancing Complete",
    description: "Your scheduled portfolio rebalancing has been completed successfully.",
    timestamp: "1 month ago",
    type: "trade",
    status: "read",
  },
  {
    id: "12",
    title: "New Investment Opportunity",
    description: "Your advisor has recommended a new private equity opportunity for your consideration.",
    timestamp: "1 month ago",
    type: "alert",
    status: "read",
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  const getIcon = (type: string) => {
    switch (type) {
      case "trade":
        return <TrendingUp className="h-5 w-5 text-gray-500" />;
      case "credit":
        return <CreditCard className="h-5 w-5 text-gray-500" />;
      case "alert":
        return <Bell className="h-5 w-5 text-gray-500" />;
      case "appointment":
      case "event":
        return <Calendar className="h-5 w-5 text-gray-500" />;
      case "task":
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-gray-800 text-white">Unread</Badge>;
      case "completed":
        return <Badge className="bg-gray-500 text-white">Completed</Badge>;
      case "pending":
        return <Badge className="bg-gray-600 text-white">Pending</Badge>;
      default:
        return <Badge className="bg-gray-400 text-white">Read</Badge>;
    }
  };

  const filterNotifications = (notifications: Notification[]) => {
    return notifications.filter((notification) => {
      // Filter by time
      if (timeFilter !== "all") {
        if (timeFilter === "today" && !notification.timestamp.includes("Today") && !notification.timestamp.includes("hours ago")) {
          return false;
        }
        if (timeFilter === "week" && (notification.timestamp.includes("month") || notification.timestamp.includes("weeks"))) {
          return false;
        }
        if (timeFilter === "month" && notification.timestamp.includes("month") && !notification.timestamp.includes("1 month")) {
          return false;
        }
      }

      // Filter by type
      if (typeFilter !== "all" && notification.type !== typeFilter) {
        return false;
      }

      // Filter by status
      if (statusFilter !== "all" && notification.status !== statusFilter) {
        return false;
      }

      // Filter by tab
      if (activeTab === "tasks" && notification.type !== "task") {
        return false;
      } else if (activeTab === "events" && notification.type !== "event") {
        return false;
      } else if (activeTab === "alerts" && notification.type !== "alert") {
        return false;
      }

      return true;
    });
  };

  const filteredNotifications = filterNotifications(mockNotifications);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
        
        <PageHeaderCard
          icon={Bell}
          title="Notifications, Tasks & Events"
          description="View and manage all your notifications, upcoming tasks, and scheduled events"
          iconColor="text-gray-700"
          iconBgColor="bg-gray-100"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">All Notifications</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-900">{filteredNotifications.length} Items</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="all" 
                  className="w-full"
                  onValueChange={(value) => setActiveTab(value)}
                >
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  </TabsList>
                
                  <ScrollArea className="h-[calc(100vh-320px)]">
                    <TabsContent value="all" className="m-0">
                      {filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                          {filteredNotifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className="flex items-start p-4 rounded-md bg-white border hover:bg-gray-50 transition-colors"
                            >
                              <div className="mr-3 mt-0.5">
                                {getIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  {getStatusBadge(notification.status)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No notifications match the selected filters</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="tasks" className="m-0">
                      {filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                          {filteredNotifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className="flex items-start p-4 rounded-md bg-white border hover:bg-gray-50 transition-colors"
                            >
                              <div className="mr-3 mt-0.5">
                                {getIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  {getStatusBadge(notification.status)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No tasks match the selected filters</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="events" className="m-0">
                      {filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                          {filteredNotifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className="flex items-start p-4 rounded-md bg-white border hover:bg-gray-50 transition-colors"
                            >
                              <div className="mr-3 mt-0.5">
                                {getIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  {getStatusBadge(notification.status)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No events match the selected filters</p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="alerts" className="m-0">
                      {filteredNotifications.length > 0 ? (
                        <div className="space-y-4">
                          {filteredNotifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className="flex items-start p-4 rounded-md bg-white border hover:bg-gray-50 transition-colors"
                            >
                              <div className="mr-3 mt-0.5">
                                {getIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium text-sm">{notification.title}</p>
                                  {getStatusBadge(notification.status)}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                                <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No alerts match the selected filters</p>
                        </div>
                      )}
                    </TabsContent>
                  </ScrollArea>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
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
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notification Type</label>
                  <Select 
                    value={typeFilter} 
                    onValueChange={setTypeFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="trade">Trades</SelectItem>
                      <SelectItem value="credit">Credits</SelectItem>
                      <SelectItem value="alert">Alerts</SelectItem>
                      <SelectItem value="event">Events</SelectItem>
                      <SelectItem value="task">Tasks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select 
                    value={statusFilter} 
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    setTimeFilter("all");
                    setTypeFilter("all");
                    setStatusFilter("all");
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
                    <span className="text-sm">All Notifications</span>
                    <Badge variant="outline">{mockNotifications.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unread</span>
                    <Badge variant="outline">{mockNotifications.filter(n => n.status === "unread").length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pending Tasks</span>
                    <Badge variant="outline">{mockNotifications.filter(n => n.type === "task" && n.status === "pending").length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Upcoming Events</span>
                    <Badge variant="outline">{mockNotifications.filter(n => n.type === "event" && n.status === "pending").length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
