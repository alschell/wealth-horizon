
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { TranslatedText } from "@/components/ui/translated-text";

interface PageHeaderCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  iconBgColor?: string;
}

const PageHeaderCard: React.FC<PageHeaderCardProps> = ({
  icon: Icon,
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
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              <TranslatedText>{title}</TranslatedText>
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              <TranslatedText>{description}</TranslatedText>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageHeaderCard;
