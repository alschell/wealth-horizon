
import { useRef, useCallback } from 'react';

type SectionRefs = Record<string, React.RefObject<HTMLDivElement>>;

export const useScrollToSection = (sectionIds: string[]) => {
  // Create refs for each section
  const sectionRefs: SectionRefs = sectionIds.reduce((acc, id) => {
    acc[id] = useRef<HTMLDivElement>(null);
    return acc;
  }, {} as SectionRefs);

  // Scroll to a specific section
  const scrollToSection = useCallback((ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return { sectionRefs, scrollToSection };
};
