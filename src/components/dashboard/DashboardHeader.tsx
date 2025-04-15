
import React from "react";
import { LayoutDashboard, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";
import { TranslatedText } from "@/components/ui/translated-text";

interface DashboardHeaderProps {
  onCustomizeClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCustomizeClick }) => {
  return (
    <div className="flex justify-between items-center">
      <PageHeaderCard
        icon={LayoutDashboard}
        title="Dashboard"
        description="Your complete financial overview at a glance"
        iconColor="text-gray-700"
        iconBgColor="bg-gray-100"
      />
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onCustomizeClick}
        className="h-8 w-8 p-0"
      >
        <Sliders className="h-4 w-4" />
        <span className="sr-only"><TranslatedText>Customize</TranslatedText></span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
