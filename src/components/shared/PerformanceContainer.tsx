
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn } from "@/components/ui/animation";
import { cn } from "@/lib/utils";

interface PerformanceContainerProps {
  title: string;
  description?: string;
  defaultTab?: string;
  tabs: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  className?: string;
  withAnimation?: boolean;
  headerRight?: ReactNode;
}

const PerformanceContainer = ({
  title,
  description,
  defaultTab,
  tabs,
  className,
  withAnimation = false,
  headerRight,
}: PerformanceContainerProps) => {
  const content = (
    <Card className={cn(className)}>
      <CardHeader className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerRight && (
            <div>{headerRight}</div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={defaultTab || tabs[0].id} className="space-y-4">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="pt-2">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
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

export default PerformanceContainer;
