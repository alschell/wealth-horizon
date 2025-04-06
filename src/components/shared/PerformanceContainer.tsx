
import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
}

const PerformanceContainer = ({
  title,
  description,
  defaultTab,
  tabs,
  className,
}: PerformanceContainerProps) => {
  return (
    <Card className={className}>
      <CardHeader className="px-6 pt-6 pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
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
            <TabsContent key={tab.id} value={tab.id}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceContainer;
