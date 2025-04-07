
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionItem } from "./actionItemsData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";

interface CustomizeQuickAccessDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: ActionItem[];
  selectedItems: string[];
  orderedItems: string[];
  onItemToggle: (id: string) => void;
  onOrderChange: (newOrder: string[]) => void;
  onSave: () => void;
}

const CustomizeQuickAccessDialog = ({
  isOpen,
  onOpenChange,
  items,
  selectedItems,
  orderedItems,
  onItemToggle,
  onOrderChange,
  onSave
}: CustomizeQuickAccessDialogProps) => {
  // Sort items alphabetically by label for the selection list
  const sortedItems = [...items].sort((a, b) => a.label.localeCompare(b.label));
  
  // Get the ordered items for display in the drag-and-drop section
  const selectedOrderedItems = orderedItems
    .filter(id => selectedItems.includes(id))
    .map(id => items.find(item => item.id === id))
    .filter(Boolean) as ActionItem[];
  
  // Add any selected items that aren't in the order yet
  const missingSelectedItems = selectedItems
    .filter(id => !orderedItems.includes(id))
    .map(id => items.find(item => item.id === id))
    .filter(Boolean) as ActionItem[];
    
  const displayItems = [...selectedOrderedItems, ...missingSelectedItems];
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const reorderedItemIds = Array.from(displayItems.map(item => item.id));
    const [movedItemId] = reorderedItemIds.splice(result.source.index, 1);
    reorderedItemIds.splice(result.destination.index, 0, movedItemId);
    
    onOrderChange(reorderedItemIds);
  };
  
  const handleSave = () => {
    // Pass the current order of displayed items as the ordered items
    const currentOrder = displayItems.map(item => item.id);
    onSave();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Quick Access</DialogTitle>
          <DialogDescription>
            Select the items you want to show in your Quick Access grid and reorder them.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto py-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Available Items</h3>
              <div className="space-y-4">
                {sortedItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <Checkbox 
                      id={`item-${item.id}`}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => onItemToggle(item.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`item-${item.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {displayItems.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Order of Display</h3>
                <p className="text-xs text-muted-foreground mb-2">Drag to reorder items</p>
                
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="quick-access-items">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {displayItems.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="flex items-center p-2 border rounded bg-white"
                              >
                                <GripVertical className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm">{item.label}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomizeQuickAccessDialog;
