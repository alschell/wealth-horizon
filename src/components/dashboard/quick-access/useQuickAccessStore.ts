
import { useState } from "react";

export const useQuickAccessStore = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);

  return {
    isCustomizing,
    setIsCustomizing,
    visibleItems,
    setVisibleItems,
    temporarySelection,
    setTemporarySelection
  };
};
