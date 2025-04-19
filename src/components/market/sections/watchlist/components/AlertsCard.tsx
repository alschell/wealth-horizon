
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellOff } from "lucide-react";
import { AlertsCardProps } from "../types";

/**
 * Alerts card component displaying active alerts for watchlist items
 * 
 * @param props - Component properties 
 * @returns Alerts card component
 */
const AlertsCard: React.FC<AlertsCardProps> = ({ filteredItems }) => {
  const subscribedItems = filteredItems.filter(item => item.subscribed);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribedItems.length > 0 ? (
            subscribedItems.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">{item.symbol}</span>
                    <span className="text-sm text-gray-500">{item.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Alert on: Price movement &gt;5%
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  Active
                </Badge>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <BellOff className="h-8 w-8 text-gray-300 mb-2" />
              <p className="text-gray-500">No active alerts</p>
              <p className="text-xs text-gray-400 mt-1">
                Click the bell icon to set alerts for your watchlist items
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsCard;
