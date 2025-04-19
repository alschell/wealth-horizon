
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ActivityFiltersProps {
  timeFilter: string;
  typeFilter: string;
  setTimeFilter: (value: string) => void;
  setTypeFilter: (value: string) => void;
  activityCounts: {
    all: number;
    trade: number;
    funding: number;
    security: number;
  };
}

export const ActivityFilters: React.FC<ActivityFiltersProps> = ({
  timeFilter,
  typeFilter,
  setTimeFilter,
  setTypeFilter,
  activityCounts,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Period</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
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
              <Badge variant="outline">{activityCounts.all}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Trading Activities</span>
              <Badge variant="outline">{activityCounts.trade}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Account Funding</span>
              <Badge variant="outline">{activityCounts.funding}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Security Events</span>
              <Badge variant="outline">{activityCounts.security}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
