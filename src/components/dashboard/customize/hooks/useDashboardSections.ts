
import { useState, useEffect } from "react";
import { defaultSections } from "../dashboardSectionsConfig";

/**
 * Hook for managing dashboard section visibility and order
 */
export const useDashboardSections = () => {
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

  const saveSectionsToStorage = () => {
    localStorage.setItem("dashboardSections", JSON.stringify(dashboardSections));
    localStorage.setItem("dashboardSectionsOrder", JSON.stringify(sectionsOrder));
  };

  // Get the ordered and filtered sections
  const getOrderedVisibleSections = (): string[] => {
    return sectionsOrder
      .filter(id => dashboardSections[id as keyof typeof dashboardSections]);
  };

  return {
    dashboardSections,
    sectionsOrder,
    setSectionsOrder,
    toggleSection,
    saveSectionsToStorage,
    getOrderedVisibleSections
  };
};
