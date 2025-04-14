
import React from "react";
import { LayoutDashboard, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { LocalizedText } from "@/components/ui/localized-text";

interface DashboardHeaderProps {
  onCustomizeClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCustomizeClick }) => {
  return (
    <div className="flex justify-between items-center">
      <PageHeaderCard
        icon={LayoutDashboard}
        title={<LocalizedText textKey="dashboard" />}
        description={<LocalizedText textKey="welcomeMessage" />}
        iconColor="text-gray-700"
        iconBgColor="bg-gray-100"
      />
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onCustomizeClick}
        className="h-8 w-8 p-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
      >
        <Sliders className="h-4 w-4" />
        <span className="sr-only"><LocalizedText textKey="settings" /></span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
