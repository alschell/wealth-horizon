
import { useState } from "react";
import { loadVisibleItems, loadItemOrder, saveToLocalStorage, marketItems } from "../utils";

export const useMarketSnapshot = () => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [visibleItems, setVisibleItems] = useState<string[]>(loadVisibleItems);
  const [itemOrder, setItemOrder] = useState<string[]>(loadItemOrder);
  
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  const [temporaryOrder, setTemporaryOrder] = useState<string[]>([]);

  const handleCustomizeOpen = () => {
    setTemporarySelection([...visibleItems]);
    setTemporaryOrder([...itemOrder]);
    setIsCustomizing(true);
  };

  const handleCustomizeSave = () => {
    setVisibleItems(temporarySelection);
    setItemOrder(temporaryOrder);
    saveToLocalStorage(temporarySelection, temporaryOrder);
    setIsCustomizing(false);
  };

  const toggleItem = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
      setTemporaryOrder(temporaryOrder.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
      setTemporaryOrder([...temporaryOrder, id]);
    }
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(temporaryOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTemporaryOrder(items);
  };

  const filteredAndOrderedItems = itemOrder
    .filter(id => visibleItems.includes(id))
    .map(id => marketItems.find(item => item.id === id))
    .filter(Boolean) as typeof marketItems;

  return {
    isCustomizing,
    setIsCustomizing,
    visibleItems,
    itemOrder,
    temporarySelection,
    temporaryOrder,
    filteredAndOrderedItems,
    handleCustomizeOpen,
    handleCustomizeSave,
    toggleItem,
    handleDragEnd
  };
};
