
import React from "react";
import { LayoutDashboard, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeaderCard from "@/components/dashboard/PageHeaderCard";

interface DashboardHeaderProps {
  onCustomizeClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCustomizeClick }) => {
  return (
    <div className="flex justify-between items-start">
      <PageHeaderCard
        icon={LayoutDashboard}
        title="Dashboard"
        description="Your complete financial overview at a glance"
        iconColor="text-gray-700"
        iconBgColor="bg-gray-100"
        className="text-left"
      />
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onCustomizeClick}
        className="h-8 w-8 p-0"
      >
        <Sliders className="h-4 w-4" />
        <span className="sr-only">Customize</span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
