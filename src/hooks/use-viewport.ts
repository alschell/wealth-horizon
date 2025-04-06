
import { useState, useEffect } from "react";

type Viewport = "mobile" | "tablet" | "desktop" | "largeDesktop";

/**
 * Custom hook for responsive designs
 */
export function useViewport() {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);
    
    // Update viewport based on width
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
      
      if (newWidth < 640) {
        setViewport("mobile");
      } else if (newWidth < 1024) {
        setViewport("tablet");
      } else if (newWidth < 1536) {
        setViewport("desktop");
      } else {
        setViewport("largeDesktop");
      }
    };
    
    // Call once to set initial viewport
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewport === "mobile";
  const isTablet = viewport === "tablet";
  const isDesktop = viewport === "desktop" || viewport === "largeDesktop";
  
  return { viewport, width, isMobile, isTablet, isDesktop };
}
