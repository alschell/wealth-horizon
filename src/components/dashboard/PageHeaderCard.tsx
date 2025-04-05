
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PageHeaderCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
}

const PageHeaderCard: React.FC<PageHeaderCardProps> = ({
  icon,
  title,
  description,
  iconColor = "text-gray-700",
  iconBgColor = "bg-gray-100"
}) => {
  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
            {icon}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground max-w-3xl">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeaderCard;
