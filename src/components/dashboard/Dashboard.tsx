
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { DashboardCustomizeDialog, useDashboardCustomize } from "@/components/dashboard/customize";

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
        {/* Dashboard header */}
        <DashboardHeader onCustomizeClick={() => setIsCustomizing(true)} />

        {/* Dashboard content */}
        <DashboardContent orderedVisibleSections={orderedVisibleSections} />

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
