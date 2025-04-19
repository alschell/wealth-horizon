
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ActivityItem from "./components/ActivityItem";

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  date: string;
  type: "trade" | "deposit" | "withdrawal" | "login" | "document" | "credit" | "other";
}

interface ActivityListProps {
  activities: Activity[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  // Ensure activities is always an array to prevent undefined.length errors
  const safeActivities = activities || [];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Activity History</CardTitle>
          <Badge className="bg-gray-800">{safeActivities.length} Activities</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-240px)]">
          <div>
            {safeActivities.length > 0 ? (
              <div className="space-y-4">
                {safeActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No activities match the selected filters</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
