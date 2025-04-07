
import React from "react";
import { NewsCategory, NewsSource } from "../CustomizeNewsDialog";

export const useNewsFilters = (
  defaultSources: NewsSource[], 
  defaultCategories: NewsCategory[]
) => {
  const [selectedSources, setSelectedSources] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("newsSelectedSources");
      return saved ? JSON.parse(saved) : defaultSources.map(s => s.id);
    } catch (e) {
      return defaultSources.map(s => s.id);
    }
  });
  
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("newsSelectedCategories");
      return saved ? JSON.parse(saved) : defaultCategories.map(c => c.id);
    } catch (e) {
      return defaultCategories.map(c => c.id);
    }
  });

  const toggleSource = (id: string) => {
    setSelectedSources(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const saveCustomization = () => {
    localStorage.setItem("newsSelectedSources", JSON.stringify(selectedSources));
    localStorage.setItem("newsSelectedCategories", JSON.stringify(selectedCategories));
    return true;
  };

  return {
    selectedSources,
    selectedCategories,
    toggleSource,
    toggleCategory,
    saveCustomization
  };
};
