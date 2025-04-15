
import { useDashboardSections } from "./hooks/useDashboardSections";
import { useDashboardDrag } from "./hooks/useDashboardDrag";
import { useCustomizeDialog } from "./hooks/useCustomizeDialog";

/**
 * Composite hook for dashboard customization that combines all functionality
 */
export const useDashboardCustomize = () => {
  const { 
    dashboardSections, 
    sectionsOrder, 
    setSectionsOrder,
    toggleSection, 
    saveSectionsToStorage,
    getOrderedVisibleSections
  } = useDashboardSections();
  
  const { handleDragEnd } = useDashboardDrag(sectionsOrder, setSectionsOrder);
  
  const { isCustomizing, openCustomizeDialog, closeCustomizeDialog } = useCustomizeDialog();

  const handleCustomizeSave = () => {
    saveSectionsToStorage();
    closeCustomizeDialog();
  };

  const orderedVisibleSections = getOrderedVisibleSections();

  return {
    isCustomizing,
    setIsCustomizing: openCustomizeDialog,
    dashboardSections,
    sectionsOrder,
    orderedVisibleSections,
    toggleSection,
    handleCustomizeSave,
    handleDragEnd
  };
};
