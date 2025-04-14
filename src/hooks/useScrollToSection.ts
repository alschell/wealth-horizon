
import { useRef, useCallback, useMemo } from 'react';

/**
 * Type definition for section references
 */
type SectionRefs = Record<string, React.RefObject<HTMLDivElement>>;

/**
 * Options for scrolling behavior
 */
interface ScrollOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
}

/**
 * Hook that creates refs for sections and provides a function to scroll to them
 * 
 * @param sectionIds - Array of section IDs to create refs for
 * @param defaultOptions - Default scroll options
 * @returns An object containing section refs and a function to scroll to a section
 */
export const useScrollToSection = (
  sectionIds: string[], 
  defaultOptions: ScrollOptions = { behavior: 'smooth', block: 'start' }
) => {
  // Create refs for each section - memoized to avoid recreating on each render
  const sectionRefs: SectionRefs = useMemo(() => {
    return sectionIds.reduce((acc, id) => {
      acc[id] = useRef<HTMLDivElement>(null);
      return acc;
    }, {} as SectionRefs);
  }, [sectionIds]);

  // Scroll to a specific section with optional override options
  const scrollToSection = useCallback((
    ref: React.RefObject<HTMLDivElement>,
    options?: Partial<ScrollOptions>
  ) => {
    if (ref && ref.current) {
      const scrollOptions = { ...defaultOptions, ...options };
      
      try {
        ref.current.scrollIntoView(scrollOptions);
      } catch (error) {
        // Fallback for browsers that don't support all options
        console.warn('Scroll options not fully supported, using fallback', error);
        ref.current.scrollIntoView({ behavior: scrollOptions.behavior });
      }
    }
  }, [defaultOptions]);

  // Scroll to a section by ID
  const scrollToSectionById = useCallback((
    sectionId: string,
    options?: Partial<ScrollOptions>
  ) => {
    const ref = sectionRefs[sectionId];
    if (ref) {
      scrollToSection(ref, options);
    } else {
      console.warn(`Section with ID "${sectionId}" not found`);
    }
  }, [sectionRefs, scrollToSection]);

  return { 
    sectionRefs, 
    scrollToSection,
    scrollToSectionById
  };
};
