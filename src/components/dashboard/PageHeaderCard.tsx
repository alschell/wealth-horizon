
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

const PageHeaderCard: React.FC<PageHeaderCardProps> = ({
  icon: Icon,
  title,
  description,
  iconColor = "text-gray-700",
  iconBgColor = "bg-gray-100",
  className = ""
}) => {
  return (
    <Card className={cn("border-none shadow-none bg-transparent", className)}>
      <CardContent className="p-0">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg ${iconBgColor}`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight text-left">{title}</h1>
            <p className="text-muted-foreground max-w-3xl text-left">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeaderCard;
