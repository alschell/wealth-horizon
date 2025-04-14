
import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export interface ScrollSectionRefs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

/**
 * Hook to manage section scrolling
 */
export function useScrollToSection(sectionsConfig: string[]) {
  const location = useLocation();
  
  // Create refs for each section
  const sectionRefs = sectionsConfig.reduce((acc, section) => {
    acc[section] = useRef<HTMLDivElement>(null);
    return acc;
  }, {} as ScrollSectionRefs);
  
  // Handle hash-based navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);
  
  // Function to scroll to a section by ref
  const scrollToSection = useCallback((sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  
  // Function to scroll to a section by ID
  const scrollToSectionById = useCallback((sectionId: string) => {
    const sectionRef = sectionRefs[sectionId];
    if (sectionRef?.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sectionRefs]);
  
  return { sectionRefs, scrollToSection, scrollToSectionById };
}
