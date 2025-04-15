
import { useState, useEffect } from "react";
import { defaultSections } from "./dashboardSectionsConfig";

export const useDashboardCustomize = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [dashboardSections, setDashboardSections] = useState({
    keyMetrics: true,
    performanceOverview: true,
    quickAccess: true,
    topAssets: true,
    recentNews: true,
    notifications: true,
    marketSnapshot: true,
    recentActivity: true,
  });
  const [sectionsOrder, setSectionsOrder] = useState<string[]>([]);

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSections = localStorage.getItem("dashboardSections");
    const savedOrder = localStorage.getItem("dashboardSectionsOrder");
    
    if (savedSections) {
      setDashboardSections(JSON.parse(savedSections));
    }
    
    if (savedOrder) {
      setSectionsOrder(JSON.parse(savedOrder));
    } else {
      // Default order is all sections in their original order
      setSectionsOrder(defaultSections.map(section => section.id));
    }
  }, []);

  const toggleSection = (section: string) => {
    setDashboardSections({
      ...dashboardSections,
      [section]: !dashboardSections[section],
    });
  };

  const handleCustomizeSave = () => {
    // Save to localStorage for persistence
    localStorage.setItem("dashboardSections", JSON.stringify(dashboardSections));
    localStorage.setItem("dashboardSectionsOrder", JSON.stringify(sectionsOrder));
    setIsCustomizing(false);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sectionsOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSectionsOrder(items);
  };

  // Get the ordered and filtered sections
  const orderedVisibleSections = sectionsOrder
    .filter(id => dashboardSections[id as keyof typeof dashboardSections]);

  return {
    isCustomizing,
    setIsCustomizing,
    dashboardSections,
    sectionsOrder,
    orderedVisibleSections,
    toggleSection,
    handleCustomizeSave,
    handleDragEnd
  };
};
