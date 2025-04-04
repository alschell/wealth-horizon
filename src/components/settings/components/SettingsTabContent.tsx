
import React from "react";
import { TabsContent } from "@/components/ui/tabs";

interface SettingsTabContentProps {
  value: string;
  children: React.ReactNode;
}

const SettingsTabContent = ({ value, children }: SettingsTabContentProps) => {
  return (
    <TabsContent value={value} className="mt-0">
      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        <div className="p-6">
          {children}
        </div>
      </div>
    </TabsContent>
  );
};

export default SettingsTabContent;
