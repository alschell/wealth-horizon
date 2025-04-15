
/**
 * Hook to handle drag and drop functionality for dashboard customization
 */
export const useDashboardDrag = (
  sectionsOrder: string[],
  setSectionsOrder: (order: string[]) => void
) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(sectionsOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setSectionsOrder(items);
  };

  return {
    handleDragEnd
  };
};
