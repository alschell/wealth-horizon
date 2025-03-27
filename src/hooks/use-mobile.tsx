
import { useEffect, useState } from "react";

export function useIsMobile() {
  // Initialize with a default value that doesn't require window
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only access window within useEffect to ensure it's running client-side
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Set up event listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
