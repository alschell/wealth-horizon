
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, CreditCard, DollarSign, FileText, Lock, TrendingUp } from "lucide-react";

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

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Activity History</CardTitle>
          <Badge className="bg-gray-800">{activities.length} Activities</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-240px)]">
          {activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity) => (
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
  );
};
