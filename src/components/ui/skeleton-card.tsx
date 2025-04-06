
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  withHeader?: boolean;
  headerHeight?: number;
  contentCount?: number;
  contentHeight?: number;
}

export function SkeletonCard({
  className,
  withHeader = true,
  headerHeight = 32,
  contentCount = 3,
  contentHeight = 20,
}: SkeletonCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      {withHeader && (
        <CardHeader className="pb-2">
          <Skeleton className={`h-${headerHeight} w-1/3`} />
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-2">
          {Array(contentCount)
            .fill(null)
            .map((_, i) => (
              <Skeleton 
                key={i} 
                className={`h-${contentHeight} ${i === 0 ? "w-full" : "w-[85%]"}`} 
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
