
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { DashboardCustomizeDialog } from "@/components/dashboard/customize";
import { useDashboardCustomize } from "@/components/dashboard/customize/useDashboardCustomize";

const Dashboard = () => {
  const {
    isCustomizing,
    setIsCustomizing,
    dashboardSections,
    sectionsOrder,
    orderedVisibleSections,
    toggleSection,
    handleCustomizeSave,
    handleDragEnd
  } = useDashboardCustomize();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard content */}
        <DashboardContent 
          orderedVisibleSections={orderedVisibleSections} 
          onCustomizeClick={() => setIsCustomizing(true)}
        />

        {/* Dashboard Customization Dialog */}
        <DashboardCustomizeDialog
          isCustomizing={isCustomizing}
          setIsCustomizing={setIsCustomizing}
          dashboardSections={dashboardSections}
          toggleSection={toggleSection}
          sectionsOrder={sectionsOrder}
          handleDragEnd={handleDragEnd}
          handleCustomizeSave={handleCustomizeSave}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
