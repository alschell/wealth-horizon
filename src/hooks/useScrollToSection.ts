
import { useRef, useCallback, useMemo } from 'react';

/**
 * Type definition for section references
 */
type SectionRefs<T extends string> = Record<T, React.RefObject<HTMLDivElement>>;

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
 * @returns An object containing section refs and functions to scroll to sections
 */
export const useScrollToSection = <T extends readonly string[]>(
  sectionIds: T, 
  defaultOptions: ScrollOptions = { behavior: 'smooth', block: 'start' }
) => {
  // Create refs for each section
  const sectionRefs = useMemo(() => {
    return sectionIds.reduce((acc, id) => {
      acc[id as string] = useRef<HTMLDivElement>(null);
      return acc;
    }, {} as Record<T[number], React.RefObject<HTMLDivElement>>);
  }, [sectionIds]);

  // Scroll to a specific section with optional override options
  const scrollToSection = useCallback((
    ref: React.RefObject<HTMLDivElement>,
    options?: Partial<ScrollOptions>
  ) => {
    if (ref?.current) {
      const scrollOptions = { ...defaultOptions, ...options };
      ref.current.scrollIntoView(scrollOptions);
    }
  }, [defaultOptions]);

  return { 
    sectionRefs, 
    scrollToSection
  };
};
