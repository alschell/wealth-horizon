
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface CardSkeletonProps {
  className?: string;
  headerHeight?: number;
  contentItems?: number;
  itemHeight?: number;
  withAction?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  headerHeight = 24,
  contentItems = 3,
  itemHeight = 20,
  withAction = false,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="space-y-0 pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className={`h-${headerHeight} w-1/3`} />
          {withAction && <Skeleton className="h-8 w-20" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {Array(contentItems)
          .fill(null)
          .map((_, i) => (
            <Skeleton
              key={i}
              className={`h-${itemHeight} w-full`}
              style={{ opacity: 1 - i * 0.15 }}
            />
          ))}
      </CardContent>
    </Card>
  );
};
