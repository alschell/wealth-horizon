
import React from "react";
import { TrendingUp, TrendingDown, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { IndexData } from "../types";

interface SubscriptionsCardProps {
  subscribedIndices: string[];
  indices: IndexData[];
  handleSelectIndex: (index: IndexData) => void;
}

const SubscriptionsCard: React.FC<SubscriptionsCardProps> = ({
  subscribedIndices,
  indices,
  handleSelectIndex
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Your Subscriptions</CardTitle>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Bell className="h-4 w-4" />
            <span className="text-xs">Manage Alerts</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {subscribedIndices.length > 0 ? (
          <div className="space-y-4">
            {indices
              .filter(index => subscribedIndices.includes(index.name))
              .map(index => {
                const isPositive = typeof index.change === 'string' 
                  ? parseFloat(index.change) >= 0 
                  : index.isPositive;
                  
                return (
                  <div 
                    key={index.symbol || index.name} 
                    className="flex justify-between items-center py-2 border-b last:border-0 cursor-pointer hover:bg-gray-50 rounded-md px-2"
                    onClick={() => handleSelectIndex(index)}
                  >
                    <div>
                      <p className="font-medium">{index.name}</p>
                      <p className="text-xs text-gray-500">{index.region}</p>
                    </div>
                    <div className={`flex items-center ${
                      isPositive ? "text-green-500" : "text-red-500"
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {isPositive && !index.change.startsWith('+') ? "+" : ""}{index.change}%
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <Star className="h-8 w-8 text-gray-300 mb-2" />
            <p className="text-gray-500">No subscriptions yet</p>
            <p className="text-xs text-gray-400 mt-1">Click the star icon to add indices to your watchlist</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionsCard;
