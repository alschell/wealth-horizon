import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ActivityHeader } from "@/components/activity/ActivityHeader";
import { ActivityFilters } from "@/components/activity/ActivityFilters";
import { ActivityList, Activity } from "@/components/activity/ActivityList";

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

const ActivityPage = () => {
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(mockActivities);

  const activityCounts = {
    all: mockActivities.length,
    trade: mockActivities.filter(a => a.type === "trade").length,
    funding: mockActivities.filter(a => a.type === "deposit" || a.type === "withdrawal").length,
    security: mockActivities.filter(a => a.type === "login").length,
  };

  useEffect(() => {
    let filtered = [...mockActivities];
    
    if (typeFilter !== "all") {
      filtered = filtered.filter(activity => activity.type === typeFilter);
    }
    
    if (timeFilter === "today") {
      filtered = filtered.filter(activity => activity.timestamp.includes("Today"));
    } else if (timeFilter === "yesterday") {
      filtered = filtered.filter(activity => activity.timestamp.includes("Yesterday"));
    } else if (timeFilter === "week") {
      filtered = filtered.filter(activity => 
        activity.timestamp.includes("Today") || 
        activity.timestamp.includes("Yesterday") || 
        activity.timestamp.includes("April")
      );
    } else if (timeFilter === "month") {
      filtered = filtered.filter(activity => 
        !activity.timestamp.includes("March") || 
        parseInt(activity.timestamp.split("March ")[1]) > 5
      );
    }
    
    setFilteredActivities(filtered);
  }, [timeFilter, typeFilter]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ActivityHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ActivityFilters
              timeFilter={timeFilter}
              typeFilter={typeFilter}
              setTimeFilter={setTimeFilter}
              setTypeFilter={setTypeFilter}
              activityCounts={activityCounts}
            />
          </div>
          
          <div className="lg:col-span-3">
            <ActivityList activities={filteredActivities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityPage;
