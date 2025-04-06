
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CardSkeletonProps {
  headerHeight?: number;
  contentItems?: number;
  itemHeight?: number;
  className?: string;
}

export function CardSkeleton({ 
  headerHeight = 28, 
  contentItems = 3, 
  itemHeight = 20,
  className 
}: CardSkeletonProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <Skeleton className="h-7 w-[180px]" style={{ height: `${headerHeight}px` }} />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array(contentItems).fill(null).map((_, i) => (
          <Skeleton 
            key={i} 
            className="w-full" 
            style={{ height: `${itemHeight}px` }} 
          />
        ))}
      </CardContent>
    </Card>
  );
}
