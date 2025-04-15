
import React, { useState } from 'react';
import CustomizeDialog from './CustomizeDialog';
import { marketItems } from '../utils';

interface MarketSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  allItems: any[];
  visibleItems: string[];
  itemOrder: string[];
  setVisibleItems: (items: string[]) => void;
  setItemOrder: (order: string[]) => void;
}

const MarketSettings: React.FC<MarketSettingsProps> = ({
  isOpen,
  onClose,
  allItems,
  visibleItems,
  itemOrder,
  setVisibleItems,
  setItemOrder
}) => {
  const [temporarySelection, setTemporarySelection] = useState<string[]>([...visibleItems]);
  const [temporaryOrder, setTemporaryOrder] = useState<string[]>([...itemOrder]);
  
  const handleToggle = (id: string) => {
    if (temporarySelection.includes(id)) {
      setTemporarySelection(temporarySelection.filter(item => item !== id));
    } else {
      setTemporarySelection([...temporarySelection, id]);
      if (!temporaryOrder.includes(id)) {
        setTemporaryOrder([...temporaryOrder, id]);
      }
    }
  };
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(temporaryOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTemporaryOrder(items);
  };
  
  const handleSave = () => {
    setVisibleItems(temporarySelection);
    setItemOrder(temporaryOrder);
    onClose();
  };
  
  return (
    <CustomizeDialog
      isOpen={isOpen}
      onOpenChange={onClose}
      temporarySelection={temporarySelection}
      temporaryOrder={temporaryOrder}
      onToggle={handleToggle}
      onDragEnd={handleDragEnd}
      onSave={handleSave}
    />
  );
};

export default MarketSettings;
