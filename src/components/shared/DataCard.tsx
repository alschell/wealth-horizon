
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/components/ui/animation";

interface DataCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  withAnimation?: boolean;
  headerAction?: React.ReactNode;
}

const DataCard = ({
  title,
  description,
  children,
  className,
  action,
  withAnimation = false,
  headerAction,
}: DataCardProps) => {
  const content = (
    <Card className={cn("h-full", className)}>
      <CardHeader className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex-grow">{children}</div>
        
        {action && (
          <Link to={action.href} className="block mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={action.onClick}
            >
              {action.label}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );

  if (withAnimation) {
    return (
      <FadeIn>
        {content}
      </FadeIn>
    );
  }

  return content;
};

export default DataCard;
