
import React from "react";
import { Icon } from "@/utils/icons"; 
import { Card } from "@/components/ui/card";

interface PageHeaderCardProps {
  icon: string;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
}

const PageHeaderCard: React.FC<PageHeaderCardProps> = ({
  icon,
  title,
  description,
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon name={icon} className={`h-6 w-6 ${iconColor}`} />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default PageHeaderCard;
