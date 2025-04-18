
import React from "react";
import { Activity } from "../ActivityList";
import { useActivityIcon } from "../hooks/useActivityIcon";

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { getIcon } = useActivityIcon();
  
  return (
    <div className="flex items-start p-4 rounded-md bg-white border hover:bg-gray-50 transition-colors">
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
  );
};

export default ActivityItem;
