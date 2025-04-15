
import React, { memo } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { DashboardCustomizeDialog } from "@/components/dashboard/customize";
import { useDashboardCustomize } from "@/components/dashboard/customize/useDashboardCustomize";
import { tryCatch } from "@/utils/errorHandling/errorHandlingCore";

/**
 * Main Dashboard component with customization capabilities
 */
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

  // Event handlers with error catching
  const handleCustomizeClick = () => {
    tryCatch(() => {
      setIsCustomizing(true);
    }, { 
      componentName: 'Dashboard',
      fallbackMessage: 'Failed to open customization dialog' 
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Dashboard content */}
        <DashboardContent 
          orderedVisibleSections={orderedVisibleSections} 
          onCustomizeClick={handleCustomizeClick}
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

// Use memo to prevent unnecessary re-renders
export default memo(Dashboard);
